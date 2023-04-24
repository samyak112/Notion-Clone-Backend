const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId;
const uuid = require('uuid')

const default_template_1 = {
  _id: uuid.v4(),
  FileName:'Getting Started',
  icon:'📄',
  parent:null,
}

const default_template_2 = {
  _id: uuid.v4(),
  FileName:'Quick Note',
  icon:'📌',
  parent:null,
}

const users = mongoose.Schema({
    username:String,
    email:String,
    profile_image:String,
    last_edited_file_id:{type:String , default:null},
    files:{type:Array , default:[default_template_1 , default_template_2]}
})

module.exports = mongoose.model('users', users)