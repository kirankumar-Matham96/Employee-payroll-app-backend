/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To contain express routes
 *
 * @description
 *
 * @file        : routes/employeePayroll.js
 * @overview    : Contains all the express routes
 * @module      : this is necessary to use HTTP methods
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 09-06-2021
 *********************************************************************/

'use strict';

//Importing payroll-controller module
const controller = require('../controllers/employeePayroll');

//import helper to verify token
const checkToken = require('../middleware/helper');

/**
 * Contains function with required routes
 * that invoke callback functions when client requested.
 * @param {instance} app (an instance of express)
 */
module.exports = (app) => {
  // To create a new employee
  app.post('/addEmployee', controller.addEmployee);

  //To login
  app.post('/employee/login', controller.loginEmployee);

  // Getting all the data from the server
  app.get('/getEmployees', checkToken.checkJWToken, controller.getAllEmployees);

  // Getting employee by id
  app.get( '/getEmployee/:empId', checkToken.checkJWToken, controller.getOneEmployee );

  // Updating the employee
  app.put( '/updateEmployee/:empId', checkToken.checkJWToken, controller.updateEmployee );

  // deleting the employee
  app.delete( '/deleteEmployee/:empId', checkToken.checkJWToken, controller.removeEmployee );
};
