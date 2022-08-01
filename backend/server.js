const app = require('./app')
const dotenv = require('dotenv');
const connectDatabase = require('./database/connection')
dotenv.config({path: 'backend/config/config.env'})

// database connection after dotenv config
connectDatabase()
app.listen(process.env.PORT, () => {
    console.log(`server started on http://localhost:${process.env.PORT}`)
})