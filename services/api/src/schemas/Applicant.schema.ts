import * as mongoose from 'mongoose';


const AppliedJob = new mongoose.Schema({
    _id: false,
    jobid: String,
})

const Experience = new mongoose.Schema({
    _id: false,
    company: String,
    position: String,
    from: String,
    to: String,
    responsibility: String
})

const Education = new mongoose.Schema({
    _id: false,
    school: String,
    qualification: String,
    graduation: String
})

const ApplicantSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    contact: String,
    job_title: String,
    about: String,
    skills: [String],
    education: [Education],
    experience: [Experience],
    uid: String,
    jobs_applied: [AppliedJob],
})


export default ApplicantSchema
