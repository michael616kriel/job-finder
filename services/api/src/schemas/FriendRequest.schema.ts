import * as mongoose from 'mongoose';

//after a request has been apporved then it will be move to the network collection
const NetworkUsers = new mongoose.Schema({
    _id: false,
    uid: String,
})

const FriendRequest = new mongoose.Schema({
    uid: String, //whos network this is
    requests: [NetworkUsers], // array of received friend requests
    pending: [NetworkUsers], // array of sent friend requests
})


export default FriendRequest;
