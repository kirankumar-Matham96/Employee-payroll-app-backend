// importing the database structure or model
const employee = require('../models/employeePayroll.js');

/**
 * creates an employee object with the request of a client
 * @param {*} req (express property)
 * @param {*} res (express property)
 * @returns promise
 */
exports.addNewEmployee = function (newEmployee, callback) {
  employee.create(newEmployee, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

/**
 * Get all the data
 * @param {*} req (express property)
 * @param {*} res (express property)
 */
exports.getAllEmp = (callback) => {
  console.log(`findAll in service: ${employee.findAll}`);
  employee.findAll((err, data) => {
    //      ⬆------ some error (findAll is not a function ?)
    return err ? callback(err, null) : callback(null, data);
  });
};

/**
 * Get employee data by id
 * @param {*} req (express property)
 * @param {*} res (express property)
 */
exports.getOne = (empId, callback) => {
  if (!empId) {
    return res
      .status(404)
      .send({ message: `Employee with id: ${empId._id} not found` });
  }

  //old
  // employee.findById(empId.empId, (err, data) => {
  //   return err ? callback(err, null) : callback(null, data);
  // });
  employee.getDataById(empId.empId, (err, data) => {
    return err ? callBack(err, null) : callBack(null, data);
  });
};

/**
 * Updating employee data
 * @param {*} empId id object
 * @param {*} empData data object
 * @param {*} callback function
 */
exports.update = function (empId, empData, callback) {
  employee.updateEmpById(empId, empData, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

/**
 * Deleting employee
 * @param {*} req (Express property)
 * @param {*} res (Express property)
 */
exports.remove = (empId, callback) => {
  if (!empId) {
    return res
      .status(404)
      .send({ message: `Employee with id: ${empId._id} not found` });
  }

  employee.removeEmpById(empId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
