const express = require('express')
const router = express.Router()

const { GetAllFiles } = require('../../Controllers/Files/GetAllFiles')
const { GetFileData } = require('../../Controllers/Files/GetFileData')
const { AddFile } = require('../../Controllers/Files/AddFile')
const { UpdateFileDetails } = require('../../Controllers/Files/UpdateFileDetails')
const { authentication } = require('../../Middlewares/authentication')
const { SaveData } = require('../../Controllers/Files/SaveData')
const { DeleteFile } = require('../../Controllers/Files/DeleteFile')


router.get('/',authentication, GetAllFiles)
router.post('/',authentication, GetFileData)
router.put('/',authentication, AddFile)
router.delete('/',authentication, DeleteFile)
router.patch('/FileDetails',authentication, UpdateFileDetails)
router.patch('/',authentication, SaveData)

module.exports = router