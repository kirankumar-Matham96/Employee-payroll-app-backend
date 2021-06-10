// importing .env library and configuring
require('dotenv').config();

//Importing mongoose library
const mongoose = require('mongoose');

/**
 * function to connect to the server:
 *  -> If the connection is successful, Then prints the success message to the console.
 *  -> If it fails to connect, then prints the error message and exits the process.
 */
exports.connectToDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('Successfully connected to the database!');
    })
    .catch((err) => {
      console.log("Couldn't connect to the database...!, Exiting", err);
      process.exit(); //exit from the process
    });
};
