// importing the database structure or model
const employee = require('../models/employeePayroll');

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
exports.getAll = (callback) => {
  employee.find((err, data) => {
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

  employee.findById(empId.empId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

/**
 * Updating employee data
 * @param {*} empId id object
 * @param {*} empData data object
 * @param {*} callback function
 */
exports.update = function (empId, empData, callback) {
  console.log(`empId: ${empId.empId}`);

  employee.findByIdAndUpdate(
    empId.empId,
    {
      firstName: empData.firstName,
      lastName: empData.lastName,
      department: empData.department,
      salary: empData.salary,
      company: empData.company,
    },
    { new: true },
    (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
  );
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

  employee.findByIdAndRemove(empId.empId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
