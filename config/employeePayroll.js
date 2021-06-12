'use strict';
// importing .env library and configuring
require('dotenv').config();
const logger = require('./logger');

//Importing mongoose library
const mongoose = require('mongoose');

/**
 * function to connect to the server:
 *  -> If the connection is successful, Then prints the success message to the console.
 *  -> If it fails to connect, then prints the error message and exits the process.
 */
exports.connectToDatabase = () => {
  mongoose.set('useUnifiedTopology', true);
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('Successfully connected to the database!');
      logger.info('Successfully connected to the database!');
    })
    .catch((err) => {
      logger.error("Couldn't connect to the database...!, Exiting", err);
      process.exit(); //exit from the process
    });
};
