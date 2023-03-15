const jwt = require('jsonwebtoken')
const user = require('../../Models/users')

const LastVisitedFile = async(req,res) => {
    const UserData = req.data;
    const {email,name} = UserData
    const data = await user.find({ email: email })
    try{
        if(data[0].last_edited_file==null){
            res.json({status:200, data:data[0].files[0]._id})
        }
        else{
            res.json({status:200, data:data[0].last_edited_file})
        }
    }

    catch{
        res.json({status:500})
    }
}

module.exports = {
    LastVisitedFile
}