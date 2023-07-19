const {Server} = require('socket.io');
require('dotenv').config();


const io = new Server(process.env.PORT, {
    cors: {
        origin: process.env.FRONTENDURI,
    }, 
})
 
console.log(process.env.FRONTENDURI);
let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}


const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}
 
 
io.on('connection',  (socket) => { 
    console.log("Connection build "); 

    //connect
    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage', data);  //send msg to otherPerson in real Time
    })

     //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})