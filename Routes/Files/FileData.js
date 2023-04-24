const express = require('express')
const router = express.Router()

const { GetAllFiles } = require('../../Controllers/Files/GetAllFiles')
const { GetFileData } = require('../../Controllers/Files/GetFileData')
const { AddFile } = require('../../Controllers/Files/AddFile')
const { UpdateIcon } = require('../../Controllers/Files/UpdateIcon')
const { authentication } = require('../../Middlewares/authentication')
const { SaveData } = require('../../Controllers/Files/SaveData')


router.get('/',authentication, GetAllFiles)
router.post('/',authentication, GetFileData)
router.put('/',authentication, AddFile)
router.put('/icon',authentication, UpdateIcon)
router.patch('/',authentication, SaveData)

module.exports = router