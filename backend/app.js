const express = require('express');
const errorMiddleware = require('./middleware/error')

const app = express()

app.use(express.json())
// routes import
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)

// middleware for error handling
app.use(errorMiddleware)

module.exports = app