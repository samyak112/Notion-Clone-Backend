const express = require('express')
const router = express.Router()


const {LastVisitedFile} = require('../../Controllers/Files/LastVisitedFile')
const { authentication } = require('../../Middlewares/authentication')
const { UpdateLastVisitedFile } = require('../../Controllers/Files/UpdateLastVisitedFile')

router.get('/',authentication, LastVisitedFile)
router.patch('/',authentication, UpdateLastVisitedFile)

module.exports = router