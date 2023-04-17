const jwt = require('jsonwebtoken')
const user = require('../../Models/users')
const mongoose = require('mongoose')

const UpdateIcon = async(req,res) => {
    const {Icon,FileId} = req.body;
    const UserData = req.data;
    const {email,name} = UserData

    var change_icon = { $set: {'files.$.icon':Icon}}
    user.updateOne({'files._id':new mongoose.Types.ObjectId(FileId)},change_icon,function(err,result){
        if (err) res.json({status:500})
        else{
            if(result.modifiedCount>0){
                res.json({status:200})
            }
            else{
                res.json({status:500})
            }
        }
    })
}

module.exports = {
    UpdateIcon
}