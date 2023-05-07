const jwt = require('jsonwebtoken')
const user = require('../../Models/users')

const UpdateLastVisitedFile = async(req,res) => {
    const {email} = req.data
    const {id} = req.body

    const NewVisitedFile = {$set:{last_edited_file_id:id}}
    const data = await user.updateOne({ email: email }, NewVisitedFile)

    if(data.modifiedCount > 0){
        res.json({status:200})
    }
    else{
        res.json({status:500})
    }
}

module.exports = {
    UpdateLastVisitedFile
}