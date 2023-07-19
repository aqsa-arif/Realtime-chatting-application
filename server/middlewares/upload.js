const multer = require('multer');
const {GridFsStorage} = require("multer-gridfs-storage"); 

require('dotenv').config();

const storage = new GridFsStorage({
    url: `${process.env.DBURL}`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        
        return  `${Date.now()}/file/${encodeURIComponent(file.originalname)}`
        
        // const match = ['image/jpg', 'image/png'];

        // if(match.indexOf(file.mimetype) === -1 ) {
        //     return `${Date.now()}-file-${file.originalname}`;
        // // Use Date.now() to avoid duplication errors of mongodb if same file uploaded again
        // }

        // return {
        //     bucketName: 'photos',   // use 'photos' colllection not default bucketName=>fs
        //     filename: `${Date.now()}-file-${file.originalname}`
        // }

        }
    }
)


const upload = multer({ storage: storage });

module.exports = upload;