const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then((data) => {
      console.log(
        "\x1b[36m%s\x1b[0m",
        `[app] database name: ${data.connection.name} \n[app] mongo db connected with server: ${data.connection.host}:${data.connection.port}`
      );
    })
};

module.exports = connectDatabase;
