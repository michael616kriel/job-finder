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
export class EmployerService {

  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Applicant') private readonly applicantModel: Model<Applicant>,
    @InjectModel('Employer') private readonly employerModel: Model<Employer>,
    @InjectModel('FriendRequest') private readonly friendRequestModel: Model<FriendRequest>,
    @InjectModel('Network') private readonly networkModel: Model<Network>
  ) { }

  async get(payload) {
    const employer = await this.employerModel.findOne({ uid: payload.uid })
    if (!employer) return { error: employer }
    return employer
  }

  async update(payload) {
    const doc = await this.employerModel.findOneAndUpdate({ uid: payload.uid }, JSON.parse(payload.data))
    if (!doc) return { error: doc }
    return payload.data;
  }

  async delete(payload) {
    const user = await this.userModel.delete({ _id: payload.uid })
    if (!user) return { error: user };
    const employer = await this.employerModel.delete({ uid: payload.uid })
    if (!employer) return { error: employer };
    return "deleted"
  }
}
