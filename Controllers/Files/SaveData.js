const {UpdateContentDetails, UpdateUserDetails} = require('./SaveDataFunctions')

const SaveData = async(req,res) => {
    const new_data = req.data;
    const {email} = new_data
    const {CoverPhotoData, BlockValues, FileName, Icon} = req.body.FinalPayload;

    let ChangeContent = {}
    let ChangeFileDetails = {}
    let ContentResponse = null
    let UserResponse = null
    
    if(CoverPhotoData !== null){
        const {value, Position} = CoverPhotoData
        ChangeContent = { $set: {'values':BlockValues, 'CoverPhoto':{value, Position} }}
    }
    else{
        ChangeContent = { $set: {'values':BlockValues}}
    }

    if(FileName != null){
        ChangeFileDetails = { $set: {'files.$.FileName':FileName, 'files.$.icon':Icon}}
        UserResponse = await UpdateUserDetails(req.body.ref_id,ChangeFileDetails,email)
    }

    ContentResponse = await UpdateContentDetails(req.body.ref_id, ChangeContent) 

    if((UserResponse == null && ContentResponse == true) || (UserResponse == true && ContentResponse == true)){
        res.json({status:200})
    }
    else{
        res.json({status:500})
    }

    
}

module.exports = {
    SaveData
}