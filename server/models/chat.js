const {mongoose} = require('mongoose');

const chatSchema = mongoose.Schema({
    members: {
        type: Array,
    },
    message: {
        type: String,
    }
},{timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;