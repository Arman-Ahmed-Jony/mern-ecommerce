const express = require('express');
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const app = express()

app.use(express.json())
app.use(cookieParser())
// routes import
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)

// middleware for error handling
app.use(errorMiddleware)

module.exports = app