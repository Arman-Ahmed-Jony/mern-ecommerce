const express = require('express')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
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
