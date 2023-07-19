const User = require("../models/user");

const addUser = async (req, res) => {
    const existUser = await User.findOne({sub: req.body.sub});

    if(existUser) return res.status(400).send({ message: 'User already Exists' });

    try {
        const user = await User(req.body);
        const saveduser = user.save();        
        res.status(200).send({
             message: 'User is saved to Database',
             saveduser: saveduser
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error 
       });  
    }
}


const AllUsers = async (req, res) => {  

    try {  
        const users = await User.find({}); 

        if(!users) return  res.status(404).send({
            message: 'NO User Found', 
       });
        
        res.status(200).send({
             message: 'Fetched All Users',
             users : users
        });
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error 
       });  
    }
}


module.exports = {addUser, AllUsers };