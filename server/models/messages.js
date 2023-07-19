const {mongoose} = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    receiverId: {
        type: String,
    },
    type: {
        type: String,
    },
    value: {
        type: String  ,
    }
},{
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;