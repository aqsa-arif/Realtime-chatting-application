const express = require('express');
const { addUser, AllUsers } = require('../controllers/userControllers');

const router = express.Router();


router.post('/addUser',  addUser );
router.get('/AllUsers',  AllUsers );


module.exports = router;