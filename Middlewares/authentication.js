const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
  );


const authentication = async(req,res,next)=>{
    try {
      const authHeader = req.headers['x-auth-token']
      const user_data = jwt.verify(authHeader, process.env.ACCESS_TOKEN);
      req.data = user_data
      next()
      
    } catch (err) {
      console.log(err)
      res.status(400).json({message:'Unauthorized User',status:400});
    }
  }

module.exports = {authentication}