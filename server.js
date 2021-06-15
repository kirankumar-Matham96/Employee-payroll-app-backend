/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Controls the operations(requests and responses)
 *
 * @description
 *
 * @file        : controllers/employeePayroll.js
 * @overview    : controller module to control the requests
 * @module      : this is necessary to run the employee Payroll API
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 09-06-2021
 *********************************************************************/

'use strict';
// Importing express module
const express = require('express');

// Importing .env modules and configuring to use attributes in the .env file
require('dotenv').config();

//Importing module to connect to the database
const connectingToDatabase = require('./config/employeePayroll.js');

//Importing swagger-UI
const swaggerUI = require('swagger-ui-express');

//Importing swagger json file for using swagger docs
const swaggerDocs = require('./swagger/swagger.json');

/**
 * Creating express app
 * -> creating an object for the express module/library
 */
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse request of content-type - application/json
app.use(express.json());

//using swagger UI
app.use('/employee-payroll-api', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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
  logger.info('Server running at port number 9000');
  console.log('Server running at port number 9000');
});

module.exports = app;
