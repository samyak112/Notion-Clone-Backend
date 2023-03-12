const express = require('express')
const router = express.Router()


const {GetAllFiles} = require('../../Controllers/Files/GetAllFiles')
const { authentication } = require('../../Middlewares/authentication')

router.get('/',authentication, GetAllFiles)

module.exports = router