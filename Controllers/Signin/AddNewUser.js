const user = require('../../Models/users')

function AddNewUser(email , name , picture) {
    return new Promise ((resolve , reject)=>{
        // here we saved those values in the new user to be saved in database 
        var new_user = new user({ 
            username: name, 
            email:email, 
            authorized:true,
            profile_image:picture
        });

        // here we saved users details
        new_user.save(function (err, data) {
            if (err) resolve (500);
            else {
                console.log(data)
                resolve ({status:200 , FileId:data[0].files[0]._id})
            }
            });      
    })
  }

  module.exports = AddNewUser