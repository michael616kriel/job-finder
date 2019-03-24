import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    display_name: String,
    profile_picture: String,
    banner_picture: String,
    type: String,
    uid: String,
})

UserSchema.pre('save', function (next, doc) {
    this.uid = this._id
    next()
})

export default UserSchema
