const jwt = require('jsonwebtoken')
const user = require('../../Models/users')
const {OAuth2Client} = require('google-auth-library')
const AddNewUser  = require('./AddNewUser')

const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
  );

const GoogleSignin = async (req, res) => {

    
    const {code} = req.body.response
    const { tokens } = await client.getToken(code);
    const {id_token} = tokens // exchange code for tokens
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID
    });

    const { email, name, picture} = ticket.payload
    const jwt_token = jwt.sign({username:name ,email:email , profile_pic:picture},process.env.ACCESS_TOKEN)

    const data = await user.find({ email: email })
    var InitialOpenedFile = null
    // data[0].files[0]._id

    if (data.length == 0) {
        const response = await AddNewUser(email , name , picture);
        
        if(response==200){
            // destructured inside this condition because i added file_id only in the else status code 200 in the AddNewUser function
            const {status, FileId} = response
            res.status(status).json({status:status, token: jwt_token , FileId:FileId})
        }
        else{
            res.status(response).json({status:response})
        }
    }
    else {
        if (data[0].authorized == true) {

            if(data[0].last_edited_file_id==null){
                InitialOpenedFile = data[0].files[0]._id
            }
            else{
                InitialOpenedFile = data[0].last_edited_file_id
            }

            res.status(201).json({ message: 'you are verified', status: 201, token: jwt_token , FileId:InitialOpenedFile });
        }
        else {
            res.status(422).json({ error: 'you are not verified yet', status: 422 });
        }
    }

}

module.exports = {
    GoogleSignin
}
