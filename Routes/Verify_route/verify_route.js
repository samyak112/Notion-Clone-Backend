const express = require('express')
const router = express.Router()

const {authentication} = require('../../Middlewares/authentication')


router.post('/',authentication ,(req,res)=>{
    res.status(201).json({message:'authorized',status:201});
})

module.exports = router