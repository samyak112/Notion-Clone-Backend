const jwt = require('jsonwebtoken')
const user = require('../../Models/users')

const GetAllFiles = async(req,res) => {
    const new_data = req.data;
    const {email,name} = new_data

    const data = await user.find({ email: email })
    res.json({username:name , data:data[0].files})
}

module.exports = {
    GetAllFiles
}