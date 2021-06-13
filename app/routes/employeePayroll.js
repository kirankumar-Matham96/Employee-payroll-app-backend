'use strict';
/**
 * Importing payroll-controller module
 * (which contains the implementations of the CRUD functions or req & res functions)
 */
const controller = require('../controllers/employeePayroll');

//check the token and verify
const checkToken = require('../middleware/helper');

/**
 * Creating a function with required routes
 * that invoke callback functions when client requested.
 * @param {*} app (an object of express)
 */
module.exports = (app) => {
  // To create a new employee
  app.post('/addEmployee', controller.addEmployee);

  //To login
  app.post('/employee/login', controller.loginEmployee);

  // Getting all the data from the server
  app.get('/employee', checkToken.checkJWToken, controller.getAllEmployees);

  // Getting employee by id
  app.get(
    '/getoneemployee/:empId',
    checkToken.checkJWToken,
    controller.getOneEmployee
  );

  // Updating the employee
  app.put(
    '/updateemployee/:empId',
    checkToken.checkJWToken,
    controller.updateEmployee
  );

  // deleting the employee
  app.delete(
    '/deleteemployee/:empId',
    checkToken.checkJWToken,
    controller.removeEmployee
  );
};
