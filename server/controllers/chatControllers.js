const Chat = require("../models/chat");
const Message = require("../models/messages");

const createConversation = async (req, res) => {
    try {
        const { senderId, recieverId } = req.body;

        const existChat = await Chat.findOne({
            members: {
                $all: [senderId, recieverId],
            }
        });
    
        if(existChat) return res.status(200).send({
            success: false,
            message: 'Coversation already exists',
            existChat
        });
    
        const conversation = await Chat({
            members: [senderId, recieverId]
        })
        conversation.save();
    
        res.status(200).send({ 
            success: true,
            message: 'Coversation created Successfully',
            conversation
        });
    
    }catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error 
       });  
}
}
 


const addTextMessage = async (req, res) => {
    try {   

        const messageBody = await Message(req.body);
        messageBody.save();

        await Chat.findByIdAndUpdate(
            req.body.conversationId,
            {message: req.body.value }
        );

        res.status(200).send({ 
             message: 'Message has been sent Sucessfully',
        });
    
    }catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error 
       });  
}
}


const getAllMessages = async (req, res) => {
    try {    
       
        const messages = await Message.find({ conversationId: req.params.id }); 

        res.status(200).send({  
             messages
        });
    
    }catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error 
       });  
    }
}

module.exports = {createConversation, addTextMessage,  getAllMessages };