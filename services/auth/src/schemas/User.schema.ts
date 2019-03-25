import * as mongoose from 'mongoose';
import * as mBcrypt from 'mongoose-bcrypt'

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

UserSchema.plugin(mBcrypt);
UserSchema.pre('save', function (next, doc) {
    this.uid = this._id
    next()
})

export default UserSchema
