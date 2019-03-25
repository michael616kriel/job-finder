import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import Job from './interfaces/job.interface'
import Applicant from './interfaces/applicant.interface'

@Injectable()
export class JobService {

  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('Applicant') private readonly applicantModel: Model<Applicant>
  ) { }

  async create(payload) {
    console.log('create job', payload)
    const newJob = this.jobModel(payload)
    const job = await newJob.save()
    if (!job) return console.error(job)
    return job
  }

  async get(payload) {
    const jobs = this.jobModel.find({})
    if (!jobs) return { error: jobs }
    return jobs
  }

  async jobApplicants(payload) {
    const job = await this.jobModel.findOne({ _id: payload.jobid })
    if (!job) return { error: job }

    const applicantIds = []
    for (var i = 0; i < job.applicants.length; i++) {
      applicantIds.push(job.applicants[i].uid)
    }

    const applicants = await this.applicantModel.find({ uid: { $in: applicantIds } })
    return applicants
  }

  async getUserJobs(payload) {
    const jobs = await this.jobModel.find({ owner_uid: payload.uid })
    if (!jobs) return { error: jobs }
    return jobs
  }

  async getUserAppliedJobs(payload) {
    const applicant = await this.applicantModel.findOne({ uid: payload.uid })
    const jobIds = []
    for (var i = 0; i < applicant.jobs_applied.length; i++) {
      jobIds.push(applicant.jobs_applied[i].jobid)
    }
    const jobs = await this.jobModel.find({ _id: { $in: jobIds } })
    return jobs
  }

  async getOne(payload) {
    const jobs = await this.jobModel.findOne({ _id: payload.id })
    if (!jobs) return { error: jobs }
    return jobs
  }

  async update(payload) {
    console.log('update job', payload.data)
    const job = await this.jobModel.findOneAndUpdate({ _id: payload.id }, JSON.parse(payload.data))
    if (!job) return console.error(job)
    return 'Job updated!'
  }

  async delete(payload) {
    const job = await this.jobModel.deleteOne({ _id: payload.id })
    if (!job) return console.error(job)
    return 'Job deleted!'
  }

  async apply(payload) {
    const { jobid, uid } = payload

    const job = await this.jobModel.updateOne({ _id: jobid }, { $addToSet: { applicants: { uid: uid } } })
    if (!job) return { error: job }

    const applicant = await this.applicantModel.updateOne({ uid: uid }, { $addToSet: { jobs_applied: { jobid: jobid } } })
    if (!applicant) return { error: applicant }

    return 'updated'
  }

}
