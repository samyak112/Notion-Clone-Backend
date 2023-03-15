const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId;


const default_template_1 = {
  _id: new ObjectID(),
  FileName:'Getting Started',
  icon:'something',
  items:[]
}

const default_template_2 = {
  _id: new ObjectID(),
  FileName:'Quick Note',
  icon:'something',
  items:[]
}

const users = mongoose.Schema({
    username:String,
    email:String,
    profile_image:String,
    last_edited_file_id:{type:String , default:null},
    files:{type:Array , default:[default_template_1 , default_template_2]}
})

module.exports = mongoose.model('users', users)