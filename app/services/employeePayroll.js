'use strict';
// Importing the database structure or model
const employee = require('../models/employeePayroll');

const helper = require('../middleware/helper');

//Using class feature
class ServiceMethods {
  /**
   * creates an employee object with the request of a client
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns promise
   */
  addNewEmployee = (newEmployee, callback) => {
    try {
      //calling the method to create new employee object with given data
      employee.createEmployee(newEmployee, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err || 'Some error occurred!', null);
    }
  };

  /**
   * Get all the data
   * @param {*} req (express property)
   * @param {*} res (express property)
   */
  getAllEmp = (callback) => {
    try {
      //calling method to get all the employees
      employee.findAll((err, data) => {
        //      ⬆------ some error (findAll is not a function ?)
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * Get employee data by id
   * @param {*} req (express property)
   * @param {*} res (express property)
   */
  getOne = (empId, callback) => {
    console.log(`empId.empId in service.js/getOne methods ${empId.empId}`);
    try {
      if (!empId.empId) {
        return res
          .status(404)
          .send({ message: `Employee with id: ${empId._id} not found` });
      }

      //calling method to get employee data with id
      employee.getDataById(empId.empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * Updating employee data
   * @param {*} empId id object
   * @param {*} empData data object
   * @param {*} callback function
   */
  update = function (empId, empData, callback) {
    try {
      //calling method to update employee
      employee.updateEmpById(empId, empData, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * Deleting employee
   * @param {*} req (Express property)
   * @param {*} res (Express property)
   */
  remove = (empId, callback) => {
    try {
      if (!empId) {
        return res
          .status(404)
          .send({ message: `Employee with id: ${empId.empId} not found` });
      }

      //calling method to delete employee
      employee.removeEmpById(empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   *
   */
  employeeLogin(empCredentials, callback) {
    employee.loginEmp(empCredentials, (err, data) => {
      if (err) {
        callback(err, null);
      } else if (
        helper.passwordCheckWithBCrypt(empCredentials.password, data.password)
      ) {
        return callback('Wrong password', null);
      }
      return data;
    });
  }
}

//exporting class
module.exports = new ServiceMethods();
