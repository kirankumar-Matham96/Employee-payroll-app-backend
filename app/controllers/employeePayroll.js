/**
 * importing module from service.js
 */
const service = require('../services/employeePayroll.js');

/**
 * function to call the create function from service.js (creates new employee)
 * @param {*} req (express property)
 * @param {*} res (express property)
 * @returns success or failure message
 */
exports.addEmployee = (req,res) => service.create(req,res);

/**
 * function to call the getAll function that gets all the data, from the service.js
 * @param {*} req (express property)
 * @param {*} res (express property)
 * @returns all the data from the server
 */
exports.getAllEmployees = (req,res) => service.getAll(req,res);

/**
 * function to call the getOne function that gets the required employee data, from the service.js
 * @param {*} req (express property)
 * @param {*} res (express property)
 * @returns employee with given id
 */
exports.getOneEmployee = (req,res) => service.getOne(req,res);

/**
 * function to call the update function that updates the required employee data, from the service.js
 * @param {*} req (express property)
 * @param {*} res (express property)
 * @returns success or failure or error message
 */
exports.updateEmployee = (req,res) => service.update(req,res);

/**
 * function to call the remove function that deletes the required employee data, from the service.js
 * @param {*} req (express property)
 * @param {*} res (express property)
 * @returns success or failure or error message
 */
exports.removeEmployee = (req,res) => service.remove(req,res);