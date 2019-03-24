import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import Job from './interfaces/job.interface'
import Applicant from './interfaces/applicant.interface'

@Injectable()
export class ApplicantService {

  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('Applicant') private readonly applicantModel: Model<Applicant>,
    @InjectModel('User') private readonly userModel: Model<Applicant>
  ) { }

  async get(payload) {
    const user = await this.userModel.findOne({ _id: payload.uid })
    console.log(user)

    const applicant = await this.applicantModel.findOne({ uid: payload.uid })
    if (!applicant) return { error: applicant }

    const output = Object.assign({}, applicant._doc)
    output['profile_picture'] = user.profile_picture
    output['banner_picture'] = user.banner_picture

    return output

  }

  async update(payload) {
    const doc = await this.applicantModel.findOneAndUpdate({ uid: payload.uid }, JSON.parse(payload.data))
    if (!doc) {
      console.log(doc)
      return { error: doc }
    }
    return payload.data
  }

  async delete(payload) {
    const user = await this.userModel.delete({ _id: payload.uid })
    if (!user) return { error: user }
    const applicant = await this.applicantModel.delete({ uid: payload.uid })
    if (!applicant) return { error: applicant }
    return 'deleted'
  }

}
