'use strict';
// Importing express module
const express = require('express');

// Importing .env modules and configuring to use attributes in the .env file
require('dotenv').config();

//Importing module to connect to the database
const connectingToDatabase = require('./config/employeePayroll.js');

/**
 * Creating express app
 * -> creating an object for the express module/library
 */
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse request of content-type - application/json
app.use(express.json());

/**
 * Connection to the database
 * ->returns connection
 */
connectingToDatabase.connectToDatabase();

// Defining a simple route to display a welcome message when at the home page.
app.get('/', (req, res) => {
  res.send('Welcome to employee payroll app 🙋‍♂️');
});

// routes required for the CRUD operations
require('./app/routes/employeePayroll.js')(app);

//trial:
const logger = require('./config/logger');
// running a server at port 9000
app.listen(process.env.PORT, () => {
  console.log('Server running at port number 9000');
});
