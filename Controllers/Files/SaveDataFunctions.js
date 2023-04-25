const user = require('../../Models/users')
const content = require('../../Models/content')

function UpdateContentDetails(ref_id, ChangeContent){
    return new Promise((resolve,reject)=>{
      content.updateOne({'ref_id':ref_id},ChangeContent,function(err,result){
        if (err) resolve(false)
        else{
            if(result.modifiedCount>0){
                resolve(true)
            }
            else{
                resolve(true)
            }
        }
        })
    })
    
  }

  function UpdateUserDetails(ref_id, ChangeFileDetails,email){
    return new Promise((resolve,reject)=>{
        user.updateOne({'email':email, 'files._id':ref_id}, ChangeFileDetails, function(err,result){
            if(err) resolve(false)
            else{
                if(result.modifiedCount>0){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            }
        })
    })
    
  }

  module.exports = {UpdateContentDetails, UpdateUserDetails}