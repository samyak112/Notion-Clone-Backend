const mongoose = require('mongoose')

const content = mongoose.Schema({
    ref_id:String,
    values:Array,
})

module.exports = mongoose.model('contents', content)