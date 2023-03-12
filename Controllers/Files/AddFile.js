const jwt = require('jsonwebtoken')
const user = require('../../Models/users')

const AddFile = async(req,res) => {
    const new_data = req.data;
    const {email,name} = new_data
    console.log('add new file')

}

module.exports = {
    AddFile
}