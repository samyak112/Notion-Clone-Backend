const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    FileName: { type: String, required: true },
    Icon: { type: String, required: true },
    Items: { type: Array, required: true }
  });

const users = mongoose.Schema({
    username:String,
    email:String,
    authorized:false,
    profile_image:String,
    last_edited_file_id:{type:String , default:null},
    files: { type: [fileSchema], default: [
        {
          FileName: "Journal",
          Icon: "12",
          Items: [
            {
              FileName: "SubJorunal",
              Icon: "12",
              Items: [{}],
            }
          ],
        },
        {
          FileName: "Notes",
          Icon: "12",
          Items: [{}],
        }
      ] }
})

module.exports = mongoose.model('users', users)