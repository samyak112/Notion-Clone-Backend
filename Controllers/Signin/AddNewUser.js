const content = require('../../Models/content');
const user = require('../../Models/users')
const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId;


function AddNewUser(email , name , picture) {
    return new Promise ((resolve , reject)=>{

        const common_payload = { color: '#37352F', background: '#FFFFFF'}

        function content_data(ref_id , value_1 , value_2 , value_3){
            return(
                { ref_id: ref_id, 
                    values: [
                    { _id: new ObjectID(), ...common_payload, value:value_1, style:'heading_1'}, 
                    { _id: new ObjectID(), ...common_payload, value:value_2, style:'heading_2'}, 
                    { _id: new ObjectID(), ...common_payload, value:value_3, style:'heading_3'}
                ]}
            )
        }

        var new_user = new user({ 
            username: name, 
            email:email, 
            profile_image:picture
        });

        new_user.save(async function (err, data) {
            if (err) reject ({FileId:null, status:500});
            else {
                const content1 = await content.create(content_data(data.files[0]._id, 'Getting Started', 'Block 1', 'Block 2'));
                const content2 = await content.create(content_data(data.files[1]._id, 'Quick Note', 'Quickly make rich document', 'Block 2'));
                resolve ({FileId:data.files[0]._id , status:200})
            }
            });      

    })
  }

  module.exports = AddNewUser