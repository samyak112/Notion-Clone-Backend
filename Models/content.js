const mongoose = require('mongoose')

const content = mongoose.Schema({
    ref_id:String,
    CoverPhoto:{type:String , default:null},
    values:Array,
})

module.exports = mongoose.model('contents', content)