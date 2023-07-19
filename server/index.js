const express = require('express');
const mongoose = require('mongoose');  
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const fileRoutes = require('./routes/fileRoutes');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DBURL,{
    useUnifiedTopology: true,  
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to mongo Atlas Successfully");
}).catch((error) => {
    console.log('Error occured while connecting to Database ',error);
})


app.use('/api/users', userRoutes );
app.use('/api/chats', chatRoutes );
app.use('/api/file', fileRoutes );



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})