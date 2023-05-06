const jwt = require('jsonwebtoken')
const user = require('../../Models/users')
const mongoose = require('mongoose')

const UpdateFileDetails = async(req,res) => {
    const {FileId,ItemData} = req.body;
    const {Item,type} = ItemData;
    const {email,username} = req.data;

    let payload = null
    if(type === 'icon'){
        payload = { $set: {'files.$.icon':Item}}
        console.log('this ran')
    }
    else{
        console.log('no this ran')
        payload = { $set: {'files.$.FileName':Item}}
    }
    user.updateOne({'files._id':FileId},payload,function(err,result){
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
    UpdateFileDetails
}