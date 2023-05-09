const mongoose = require('mongoose')

const users = mongoose.Schema({
    username:String,
    email:String,
    profile_image:String,
    last_edited_file_id:{type:String , default:null},
    files:Array
})

module.exports = mongoose.model('users', users)