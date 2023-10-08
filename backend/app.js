const express = require('express')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}))
// routes import
const order = require('./routes/orderRoute')
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)

// middleware for error handling
app.use(errorMiddleware)

module.exports = app
