/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database
 *
 * @description
 *
 * @file        : service/employeePayroll.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : this is necessary to perform CRUD operations
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 09-06-2021
 *********************************************************************/

'use strict';

// Importing the database structure or model
const employeeSchema = require('../models/employeePayroll');

//Importing helper class
const helper = require('../middleware/helper');

//ES-6 feature: class
class ServiceMethods {
  /**
   * creates an employee object with the request of a client
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns callback
   */
  addNewEmployee = (newEmployee, callback) => {
    try {
      //calling the method to create new employee object with given data
      employeeSchema.createEmployee(newEmployee, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err || 'Some error occurred!', null);
    }
  };

  /**
   * Gets all the employees data
   * @param {*} callback callback function
   */
  getAllEmp = (callback) => {
    try {
      //calling method to get all the employees
      employeeSchema.findAll((err, data) => {
        //      ⬆------ some error (findAll is not a function ?)
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * get the employee with provided ID
   * @param {*} empId path to the employee object
   * @param {*} callback callback function
   * @returns callback, status, object
   */
  getOne = (empId, callback) => {
    try {
      if (!empId.empId) {
        return res
          .status(404)
          .send({ message: `Employee with id: ${empId._id} not found` });
      }

      //calling method to get employee data with id
      employeeSchema.getDataById(empId.empId, (err, data) => {
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
      employeeSchema.updateEmpById(empId, empData, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  /**
   * deletes the data with id
   * @param {*} empId path to the object
   * @param {*} callback callback function
   * @returns
   */
  remove = (empId, callback) => {
    try {
      if (!empId.empId) {
        return res
          .status(404)
          .send({ message: `Employee with id: ${empId.empId} not found` });
      }

      //calling method to delete employee
      employeeSchema.removeEmpById(empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };
}

//exporting class
module.exports = new ServiceMethods();
