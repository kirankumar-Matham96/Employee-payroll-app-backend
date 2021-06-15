/**
 * Author: kirankumar Matham
 * Resources: ExpressJS, dotenv, SwaggerUI, SwaggerDocs(from json file imported)
 * Purpose:
 *  This is the starting point of the program.
 *  To connect with expressJS.
 *  To connect the server.
 *  To reroute the requests to controller.
 */

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
