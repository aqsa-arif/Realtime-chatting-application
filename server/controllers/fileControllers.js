const {  mongoose } = require('mongoose');
const grid = require('gridfs-stream');

require('dotenv').config();

//GridFSBucket use for performing operations on individual files in GridFS. It does not provide direct querying capabilities as gridfsStream do

// gridfsStream or gfs gain access to mongodb, gain access to operations or methods to work with mongodb and collecton to work with => so gridfsStream can retreive files in GridFs, mongoose here can't cuz no defined schema or model for fs.
let gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    // file-related operations in GridFS using the gridFsBucket instance like downloadStream, createStream, delete, rename ...
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs',
    });
    gfs = grid(conn.db, mongoose.mongo);  // mongodb object provided by the mongoose  module. The mongodb object contains various MongoDB-related classes and methods, operations or commands that Mongoose internally uses.
    gfs.collection('fs');  //gfs has access or All data of fs collections
})



const uploadFile = async (req, res) => {
    const filename = encodeURIComponent(req.file.filename) 
    try {  
        if(!req.file){
          return  res.status(404).send({ 
                 message: `File Not Found`,
            });
        }
 
        const imageurl = `${process.env.URL}/api/file/${filename}`; 
        res.status(200).send(imageurl); 
    
    }catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error 
       });  
    }
}
 

const getFile = async (req, res) => { 
    try {    
         
        const file = await gfs.files.findOne({ filename: req.params.filename }); 
        console.log(file);

        const readStream =  gridFsBucket.openDownloadStream(file._id); //it creates a readableStream that allows to read file data in a streaming or sequential manner, readStream doesn't consist of single or multiple chunks as chunks are not stored directly wihtin readStream object but stream provides an interface to access chunks of data as they are retreived from gridFs
        readStream.pipe(res);   //pipe built-in method in nodejs, Allows to transfer data from readable stream to writable stream , res is http response, object of ServerResponse class but here it acts as interface for writable stream cuz using pipe method to write file data from readable stream in/to http resonse objecct(res)  
 
    }catch (error) {
        res.status(500).send({
            message: 'Internal Server error',
            error 
       });  
}
}

module.exports = {uploadFile, getFile };