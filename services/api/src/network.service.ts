import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import Job from './interfaces/job.interface'
import Applicant from './interfaces/applicant.interface'
import FriendRequest from './interfaces/friendRequest.interface'
import Network from './interfaces/network.interface'
import Employer from './interfaces/employer.interface'
import User from './interfaces/user.interface'

@Injectable()
export class NetworkService {

  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Applicant') private readonly applicantModel: Model<Applicant>,
    @InjectModel('Employer') private readonly employerModel: Model<Employer>,
    @InjectModel('FriendRequest') private readonly friendRequestModel: Model<FriendRequest>,
    @InjectModel('Network') private readonly networkModel: Model<Network>
  ) { }

  async getUsers(payload) {
    const result = await this.networkModel.findOne({ uid: payload.uid })

    const uids = []
    if (result) {
      for (var i = 0; i < result.network.length; i++) {
        uids.push(result.network[i].uid)
      }
    }
    uids.push(payload.uid) //dont get current user

    const aggregate = [
      { $match: { uid: { $not: { $in: uids } } } },
      {
        $lookup: {
          from: 'applicants',
          localField: 'uid',
          foreignField: 'uid',
          as: 'profile.applicant',
        },
      },
      {
        $lookup: {
          from: 'employers',
          localField: 'uid',
          foreignField: 'uid',
          as: 'profile.employer',
        },
      },
      // get total, AND preserve the results
      {
        $group: { _id: 0, total: { $sum: 1 }, results: { $push: '$$ROOT' } }
      },
      {
        $project: {
          _id: 0,
          total: 1,
          users: { $slice: ['$results', parseInt(payload.offset), parseInt(payload.limit)] }
        }
      }
    ]
    const network = this.userModel.aggregate(aggregate)
    return network[0]

  }

  async connectUsers(uid, connectWith) {
    var query = { uid: uid },
      update = {
        $addToSet: { network: { uid: connectWith } },
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true }

    // Find the document
    const result = await this.networkModel.findOneAndUpdate(query, update, options)
    if (!result) return
    return result
  }

  async getFriendRequests(payload) {
    const result = await this.friendRequestModel.findOne({ uid: payload.uid })

    if (!result) return
    const uids = []
    if (result) {
      for (var k = 0; k < result.requests.length; k++) {
        uids.push(result.requests[k].uid)
      }
    }
    uids.push(payload.uid) //dont get current user

    const network = await this.userModel.aggregate(
      [
        { $match: { uid: { $in: uids } } },
        {
          $lookup: {
            from: 'applicants',
            localField: 'uid',
            foreignField: 'uid',
            as: 'userProfile',
          },
        },
        {
          $project: {
            _id: 0,
            username: 1,
            type: 1,
            email: 1,
            profile_picture: 1,
            banner_picture: 1,
            uid: 1,
            profile: '$userProfile',
          },
        },
      ])
    return {
      friendRequests: result,
      userData: network,
    }
  }

  async createFriendRequest(uid, connectWith) {
    var query = { uid: uid },
      update = {
        uid: uid,
        $addToSet: { pending: { uid: connectWith } },
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true }

    const result = this.friendRequestModel.findOneAndUpdate(query, update, options)
    if (!result) return
    return result
  }

  async removeFriendRequest(uid, connectWith) {
    var query = { uid: connectWith },
      update = {
        $pull: { pending: { uid: uid } },
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true }

    const result = await this.friendRequestModel.findOneAndUpdate(query, update, options)
    if (!result) return
    return result
  }

  async connect(payload) {
    const friendReqeust = await this.createFriendRequest(payload.uid, payload.connectWith)
    var query = { uid: payload.connectWith },
      update = {
        $addToSet: { requests: { uid: payload.uid } },
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const result = await this.friendRequestModel.findOneAndUpdate(query, update, options)
    if (!result) return
    return result
  }

  async acceptFriendRequest(payload) {
    console.log(payload)

    const scope = this

    //remove pending request from the user who requested it
    const removeFriendReq = await scope.removeFriendRequest(payload.uid, payload.connectWith)

    var query = { uid: payload.uid },
      update = {
        $pull: { requests: { uid: payload.connectWith } },
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true }
    //remove friend request from the user who received it
    const result3 = await this.friendRequestModel.findOneAndUpdate(query, update, options)
    if (!result3) return
    if (payload.accept) {
      // if user accepted request
      //add user to network
      const result1 = await scope.connectUsers(payload.uid, payload.connectWith)
      let result = [result1]
      const result2 = await scope.connectUsers(payload.connectWith, payload.uid)
      result.push(result2)
      return result;
    } else {
      //request declined
      return 'request declined'
    }

  }

  async getMyNetwork(payload) {
    const result = await this.networkModel.findOne({ uid: payload.uid })
    const uids = []
    if (result) {
      for (var i = 0; i < result.network.length; i++) {
        uids.push(result.network[i].uid)
      }
    }

    const network = this.userModel.find({ _id: { $in: uids } })
    return network

  }

  async profile(payload) {
    let modelMap = {
      applicant: this.applicantModel,
      employer: this.employerModel
    }
    const user = await this.userModel.findOne({ _id: payload.uid })
    // console.log('user.type', user)
    if (modelMap.hasOwnProperty(user.type)) {
      modelMap[user.type].findOne({ uid: user._id }, (err, data) => {
        return data
      })
    } else {
      return 'something went wrong'
    }
  }


  async generalStats(payload) {
    let stats = {
      applicants: 0,
      employers: 0,
      jobs: 0,
    }
    stats['applicants'] = await this.applicantModel.countDocuments({})
    stats['employers'] = await this.employerModel.countDocuments({})
    stats['jobs'] = await this.jobModel.countDocuments({})
    return stats
  }

}
