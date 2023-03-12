const express = require('express')
const router = express.Router()


const {AddFile} = require('../../Controllers/Files/AddFile')

router.post('/', AddFile)

module.exports = router