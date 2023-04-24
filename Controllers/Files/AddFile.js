const jwt = require('jsonwebtoken')
const user = require('../../Models/users')
const content = require('../../Models/content')
const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId;
const uuid = require('uuid')

const AddFile = async(req,res) => {
    const new_data = req.data;
    const {email,name} = new_data
    // console.log(req.body)
    const {FinalPayload, id} = req.body
    const {FileName, CoverPhotoData, BlockValues, Icon} = FinalPayload

    // Used constant uuid so that same id can be sent as the ref id for content
    const FileID = uuid.v4()

    // add file in user data for explorer
    const AddNewFile = { $push: {files:{'_id':FileID, 'FileName':FileName, 'icon':Icon, parent:id} }}
    const AddNewFileContent = {ref_id:FileID, CoverPhoto:CoverPhotoData, values:BlockValues}
    user.updateOne({'email':email},AddNewFile, async function(err,result){
        if (err) res.json({status:500})
        else{
            if(result.modifiedCount>0){
                const new_content = await content.create(AddNewFileContent);
                console.log(new_content)

                res.json({status:200})
            }
            else{
                res.json({status:500})
            }
        }
    })

}

module.exports = {
    AddFile
}