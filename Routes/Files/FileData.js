const express = require('express')
const router = express.Router()

const { GetAllFiles } = require('../../Controllers/Files/GetAllFiles')
const { GetFileData } = require('../../Controllers/Files/GetFileData')
const { AddFile } = require('../../Controllers/Files/AddFile')
const { authentication } = require('../../Middlewares/authentication')


router.get('/',authentication, GetAllFiles)
router.post('/',authentication, GetFileData)
router.put('/',authentication, AddFile)

module.exports = router