export default interface Applicant {
    firstname: String,
    lastname: String,
    contact: String,
    job_title: String,
    about: String,
    skills: [String],
    education: Array<any>,
    experience: Array<any>,
    uid: String,
    jobs_applied: Array<any>,
}