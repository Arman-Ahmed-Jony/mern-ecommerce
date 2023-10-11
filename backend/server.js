const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })
const app = require('./app')
const cloudinary = require('cloudinary')
const connectDatabase = require('./database/connection')

// handling uncought exception
process.on('uncaughtException', (error) => {
  console.log(`error: ${error.message}`)
  console.log(' shutting down the server due to uncaught exception')
  process.exit(1)
})

// database connection after dotenv config
connectDatabase()
// cloudinary connection after          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
const server = app.listen(process.env.PORT, () => {
  console.log(`server started on http://localhost:${process.env.PORT}`)
})

// unhandled promise rejection
process.on('unhandledRejection', (error) => {
  console.log(`error: ${error.message}`)
  console.log(' shutting down the server due to unhandled promise rejection')
  server.close(() => {
    process.exit(1)
  })
})
