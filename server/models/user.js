const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    aud :  String , 
    azp : String, 
    email: String, 
    email_verified: Boolean,   
    exp: Number,  
    family_name: String,  
    given_name: String,   
    iat: Number, 
    iss: String, 
    jti: String,  
    name:  {
        type: String, 
        required: true
    }, 
    nbf: Number, 
    picture:  {
        type: String, 
        required: true
    },  
    sub: {
        type: String, 
        required: true
    } 
});

const User = mongoose.model('user', userSchema);

module.exports = User;