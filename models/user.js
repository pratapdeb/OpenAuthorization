const mongoose =  require('mongoose');


const User = mongoose.model('user',new  mongoose.Schema({
        username:String,
        googleID:String
}))

module.exports  = User;