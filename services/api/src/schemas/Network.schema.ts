import * as mongoose from 'mongoose';

const NetworkUsers = new mongoose.Schema({
    _id: false,
    uid: String,
})

const NetworkSchema = new mongoose.Schema({
    uid: String, //whos network this is
    network: [NetworkUsers], // array of user uid that belong to a certain user
})

export default NetworkSchema
