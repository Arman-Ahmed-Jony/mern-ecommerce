const express = require('express');
const errorMiddleware = require('./middleware/error')

const app = express()

app.use(express.json())
// routes import
const product = require("./routes/productRoute")

app.use("/api/v1", product)

// middleware for error handling
app.use(errorMiddleware)

module.exports = app