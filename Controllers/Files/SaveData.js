const jwt = require('jsonwebtoken')
const user = require('../../Models/users')
const content = require('../../Models/content')
const mongoose = require('mongoose')

const SaveData = async(req,res) => {
    const {CoverPhotoData, BlockValues, FileName, Icon} = req.body.FinalPayload;

    let ChangeContent = {}
    if(CoverPhotoData !== null){
        const {CoverPhoto, Position} = CoverPhotoData
        ChangeContent = { $set: {'values':BlockValues, 'CoverPhoto':{value:CoverPhoto, Position} }}
    }
    else{
        ChangeContent = { $set: {'values':BlockValues}}
    }

    content.updateOne({'ref_id':req.body.ref_id},ChangeContent,function(err,result){
        if (err) res.json({status:500})
        else{
            if(result.modifiedCount>0){
                res.json({status:200})
            }
            else{
                res.json({status:500})
            }
        }
        console.log(result)
    })
}

module.exports = {
    SaveData
}