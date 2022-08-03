const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/connection");
dotenv.config({ path: "backend/config/config.env" });

// handling uncought exception
process.on("uncaughtException", (error) => {
  console.log(`error: ${error.message}`);
  console.log(" shutting down the server due to uncaught exception");
  process.exit(1);
});

// database connection after dotenv config
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`server started on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`error: ${error.message}`);
  console.log(" shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
