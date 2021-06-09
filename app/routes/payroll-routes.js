/**
 * Importing payroll-controller module
 * (which contains the implementations of the CRUD functions or req & res functions)
 */
const routes = require('../controllers/payroll-controller');

/**
 * Creating a function with required routes
 * that invoke callback functions when client requested.
 * @param {*} app (an object of express)
 */
module.exports = (app) => {
  /**
   * to create a new employee
   * callback: routes.create
   */
  // app.post('/employee', routes.create);
  app.post('/employee', routes.addEmployee);

  /**
   * getting all the data from the server
   * callback: routes.findAll
   */
  // app.get('/employee',routes.getAll);
  app.get('/employee',routes.getAllEmployees);

  /**
   * getting employee by id
   * callback: routes.getOne
   */
  app.get('/employee/:empId',routes.getOneEmployee);

  /**
   * updating the employee
   */
  app.put('/employee/:empId',routes.updateEmployee);

  /**
   * deleting the employee
   */
  app.delete('/employee/:empId',routes.removeEmployee)
};
