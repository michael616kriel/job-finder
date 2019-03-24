import * as mongoose from 'mongoose';

const EmployerSchema = new mongoose.Schema({
    name: String,
    website: String,
    address: String,
    contact: String,
    slogan: String,
    industry: String,
    email: String,
    logo: String,
    uid: String,
})

export default EmployerSchema
