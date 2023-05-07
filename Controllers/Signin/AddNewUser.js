const content = require('../../Models/content');
const user = require('../../Models/users')
const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId;


function AddNewUser(email , name , picture) {
    return new Promise ((resolve , reject)=>{

        const common_payload = { color: '#37352F', background: '#FFFFFF'}

        function content_data(ref_id, TemplateNumber){
            if(TemplateNumber === 1){
                return(
                    {
                        ref_id:ref_id,
                        values:[
                            { _id: new ObjectID(), ...common_payload, value:'👋 Welcome to Notion!', style:'text'}, 
                            { _id: new ObjectID(), ...common_payload, value:' ', style:'text'}, 
                            { _id: new ObjectID(), ...common_payload, value:'Here are the basics:', style:'text'},
                            { _id: new ObjectID(), ...common_payload, value:'Hit / to see all the types of content you can add - headers, videos, sub pages, etc.', style:'to_do_list' ,isChecked:false},
                            { _id: new ObjectID(), ...common_payload, value:'Click the + New Page button at the bottom of your sidebar to add a new page', style:'to_do_list' ,isChecked:false},
                            { _id: new ObjectID(), ...common_payload, value:'See the ⋮⋮ to the left of this checkbox on hover? Click and drag to move this line', style:'to_do_list' ,isChecked:false},
                            { _id: new ObjectID(), ...common_payload, value:'Select this line and press enter to add a new number to the list', style:'number_list'},
                        ]
                    }
                )
            }
            else{
                return(
                    {
                        ref_id:ref_id,
                        values:[
                            { _id: new ObjectID(), ...common_payload, value:'Jot down some text', style:'heading_1'}, 
                            { _id: new ObjectID(), ...common_payload, value:'They found Mary, as usual, deep in the study of thorough-bass and human nature; and had some extracts to admire, and some new observations of threadbare morality to listen to. Catherine and Lydia had information for them of a different sort.', style:'text'}, 
                            { _id: new ObjectID(), ...common_payload, value:'Make a to-do list', style:'heading_1'}, 
                            { _id: new ObjectID(), ...common_payload, value:'Wake up', style:'to_do_list' ,isChecked:false},
                            { _id: new ObjectID(), ...common_payload, value:'Eat breakfast', style:'to_do_list' ,isChecked:false},
                            { _id: new ObjectID(), ...common_payload, value:'Brush teeth', style:'to_do_list' ,isChecked:true},
                        ]
                    }
                )
            }
        }


        let new_user = new user({ 
            username: name, 
            email:email, 
            profile_image:picture
        });

        new_user.save(async function (err, data) {
            if (err) reject ({FileId:null, status:500});
            else {
                const content1 = await content.create(content_data(data.files[0]._id,1));
                const content2 = await content.create(content_data(data.files[1]._id,2));
                resolve ({FileId:data.files[0]._id , status:200})
            }
            });      

    })
  }

  module.exports = AddNewUser