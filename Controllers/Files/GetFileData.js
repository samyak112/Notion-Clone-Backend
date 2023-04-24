const jwt = require('jsonwebtoken')
const content = require('../../Models/content')

const GetFileData = async(req,res) => {
    const {FileId} = req.body
    console.log(FileId)
    const FileData = await content.find({ ref_id: FileId })

    try{
        res.status(200).json({FileData:FileData[0], status:500})
    }
    catch{
        res.status(500).json({FileData:null , status:500})
    }
}

module.exports = {
    GetFileData
}