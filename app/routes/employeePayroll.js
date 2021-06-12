'use strict';
/**
 * Importing payroll-controller module
 * (which contains the implementations of the CRUD functions or req & res functions)
 */
const controller = require('../controllers/employeePayroll');

/**
 * Creating a function with required routes
 * that invoke callback functions when client requested.
 * @param {*} app (an object of express)
 */
module.exports = (app) => {
  // To create a new employee
  app.post('/employee', controller.addEmployee);

  //To login
  app.post('/employee/login', controller.loginEmployee);

  // Getting all the data from the server
  app.get('/employee', controller.getAllEmployees);

  // Getting employee by id
  app.get('/employee/:empId', controller.getOneEmployee);

  // Updating the employee
  app.put('/employee/:empId', controller.updateEmployee);

  // deleting the employee
  app.delete('/employee/:empId', controller.removeEmployee);

  /**
   * TODO:
   * for registration:
   * for login: app.post('/employee/login', controller.addEmployee);
   */
};
