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

    if (data.length == 0) {
        const response = await AddNewUser(email , name , picture);
        const {status, FileId} = response
        
        if(status==200){
            res.status(status).json({status:status, token: jwt_token , FileId:FileId})
        }
        else{
            res.status(status).json({status:status})
        }
    }
    else {
        try{
            const {last_edited_file_id} = data[0]
            if(last_edited_file_id==null){
                InitialOpenedFile = files[0]._id
            }
            else{
                InitialOpenedFile = last_edited_file_id
            }
            res.status(201).json({ message: 'you are verified', status: 201, token: jwt_token , FileId:InitialOpenedFile });
        }
        catch{
            res.status(500).json({ message: 'something went wrong', status: 500});
        }
        
        
    }

}

module.exports = {
    GoogleSignin
}
