const jwt = require('jsonwebtoken')
const content = require('../../Models/content')
const user = require('../../Models/users')

const GetFileData = async(req,res) => {
    const {FileId} = req.body
    const {email} = req.data
    const CheckFileInUser = await user.find({email:email, 'files._id':FileId})
    if(CheckFileInUser.length === 0){
        res.json({status:500})
    }
    else{
        const FileData = await content.find({ ref_id: FileId })

        if(FileData.length !== 0){
            res.json({FileData:FileData[0], status:200})
        }
        else{
            res.json({FileData:null , status:500})
        }
    }
    
}

module.exports = {
    GetFileData
}