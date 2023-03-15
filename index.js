const express = require('express')
const app = express()
const http = require('http')
require('dotenv').config()
const port = process.env.PORT || 3090;
const connect_db = require('./Config/db')
const cors = require('cors')


connect_db()
app.use(cors())
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// Signin
app.use('/google_signin', require('./Routes/Signin/GoogleSignin'));

// Files
app.use('/FileData' , require('./Routes/Files/FileData'))
// app.use('/AddFile' , require('./Routes/Files/AddFile'))
app.use('/lastvisitedfile' , require('./Routes/Files/LastVisitedFile'))

// For Private Routes
app.use('/verify_route' , require('./Routes/Verify_route/verify_route'))
