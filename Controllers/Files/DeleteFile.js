const user = require('../../Models/users')
const content = require('../../Models/content')
const mongoose = require('mongoose')
const uuid = require('uuid')

const DeleteFile = async(req,res) => {
    const new_data = req.data;
    const {email} = new_data
    const TargetId = req.body.id

    async function DeleteNodes(TargetId, IsFirstIteration){
        return new Promise(async (resolve,reject)=>{
            try{
                let ItemsToIterate = []
                if(IsFirstIteration){
                    const UserItemToDelete = { $pull: {files:{_id:TargetId}}}
    
                    await user.updateOne({ email: email },UserItemToDelete).exec();
                    await content.deleteOne({ref_id:TargetId}).exec()
                }
                
                const data = await user.aggregate([
                    { $match: { email: email } },
                    {
                    $project: {
                        files: {
                        $filter: {
                            input: '$files',
                            as: 'file',
                            cond: { $eq: ['$$file.parent', TargetId] }
                        }
                        }
                    }
                    }
                ]).exec();
    
                ItemsToIterate = data[0].files;
    
                const MultipleUserItemsToDelete = { $pull: {files:{parent:TargetId}}}
                await user.updateMany({email:email},MultipleUserItemsToDelete).exec()
    
                if(ItemsToIterate.length > 0){
                    for (let i = 0; i < ItemsToIterate.length; i++) {
                        content.deleteOne({ref_id:ItemsToIterate[i]._id}).exec()
                    }
            
                    for (let i = 0; i < ItemsToIterate.length; i++) {
                        await DeleteNodes(ItemsToIterate[i]._id,false)
                    }
                }  
                resolve ({status:200})
            }

            catch(err){
                resolve ({status:500})
            }
            
        })
              
        
    }

    const response = await DeleteNodes(TargetId, true)
    res.json(response)


}

module.exports = {
    DeleteFile
}