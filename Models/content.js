const mongoose = require('mongoose')

const content = mongoose.Schema({
    ref_id:String,
    CoverPhoto:{value:{type:String , default:null}, Position:{type:Number , default:50}},
    values:Array,
})

module.exports = mongoose.model('contents', content)