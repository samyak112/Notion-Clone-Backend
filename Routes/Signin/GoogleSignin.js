const express = require('express')
const router = express.Router()


const {GoogleSignin} = require('../../Controllers/Signin/GoogleSignin')

router.post('/', GoogleSignin)

module.exports = router