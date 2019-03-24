import * as mongoose from 'mongoose';

const JobApplicants = new mongoose.Schema({
    _id: false,
    uid: String,
})

const Job = new mongoose.Schema({
    title: String,
    company: String,
    description: String,
    requirements: String,
    skills: String,
    responsibility: String,
    location: String,
    salary: String,
    owner_uid: String,
    industry: String,
    applicants: [JobApplicants],
})

export default Job;
