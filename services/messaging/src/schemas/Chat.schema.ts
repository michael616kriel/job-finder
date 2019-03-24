import * as mongoose from 'mongoose';

const Message = new mongoose.Schema({
    timestamp: String,
    owner: String,
    message: String,
})

const Chat = new mongoose.Schema({
    uids: [String],
    messages: [Message],
})



export default Chat
