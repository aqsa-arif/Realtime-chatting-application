const express = require('express'); 
const { createConversation, addTextMessage, getAllMessages } = require('../controllers/chatControllers');

const router = express.Router();


router.post('/createConversation', createConversation);
router.post('/addMessage',  addTextMessage ); 
router.get('/getAllTexts/:id',  getAllMessages );


module.exports = router;