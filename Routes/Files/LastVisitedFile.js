const express = require('express')
const router = express.Router()


const {LastVisitedFile} = require('../../Controllers/Files/LastVisitedFile')
const { authentication } = require('../../Middlewares/authentication')

router.get('/',authentication, LastVisitedFile)

module.exports = router