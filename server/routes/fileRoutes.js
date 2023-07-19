const express = require('express'); 
const {uploadFile, getFile } = require('../controllers/fileControllers');
const upload = require('../middlewares/upload');

const router = express.Router();


router.post('/upload', upload.single('file') , uploadFile ); 
router.get('/:filename', getFile ); 


module.exports = router;