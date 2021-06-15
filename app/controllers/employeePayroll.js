/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations(requests and responses)
 * 
 * @description
 * 
 * @file        : controllers/employeePayroll.js
 * @overview    : controller module to control the requests
 * @module      : this is necessary to run the employee Payroll API
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 09-06-2021
 *********************************************************************/

'use strict';

// Importing module from service.js
const service = require('../services/employeePayroll.js');

//Importing middle ware to validate schema (joi validator)
const { validateInput } = require('../middleware/validation');

//ES6-feature: class
class EmployeeController {
  /**
   * function to call the create function from service.js (creates new employee)
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  addEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res.status(400).send({
          success: false,
          message: userInputValidation.error.details[0].message,
          data: data,
        });
      }

      //Object for the new employee data
      const newEmployee = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        salary: req.body.salary,
        company: req.body.company,
      };

      //calling method to add new employee data
      service.addNewEmployee(newEmployee, (err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message:
                err.message || 'Some error occurred while adding employee',
            })
          : res.status(201).send({
              success: true,
              message: 'Employee added successfully',
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🎈',
      });
    }
  };

  /**
   * function to call the getAll function that gets all the data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  getAllEmployees = (req, res) => {
    try {
      service.getAllEmp((err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message: err.message || 'some error occurred',
            })
          : res.status(200).send({
              success: true,
              message: 'Successfully retrieved the employees data',
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🎆',
      });
    }
  };

  /**
   * function to call the getOne function that gets the required employee data,
   * from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and employee object
   */
  getOneEmployee = (req, res) => {
    const empId = req.params;
    try {
      //calling a function to get the employee with id
      service.getOne(empId, (err, data) => {
        if (!data)
          res
            .status(404)
            .send({ success: false, message: 'employee not found!🤷🏻‍♀️' });
        return err
          ? res.status(500).send({
              success: false,
              message:
                err.message || 'some error occurred while getting the data',
            })
          : res.status(200).send({
              success: true,
              message: 'Employee retrieved successfully',
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🧨',
      });
    }
  };

  /**
   * function to call the update function that updates the required employee data,
   * from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  updateEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res.status(400).send({
          success: false,
          message: userInputValidation.details[0].message,
        });
      }

      //id param for updating exact employee
      const empId = req.params;

      //employee updated details from client
      const updatedDetails = {
        id: req.params.empId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        salary: req.body.salary,
        company: req.body.company,
      };

      //calling method to update employee data
      service.update(empId, updatedDetails, (err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message:
                err.message || 'some error occurred while updating the details',
            })
          : res.status(200).send({
              success: true,
              message: `Details updated for the employee with id: ${empId}`,
              data: data,
            });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!🎎',
      });
    }
  };

  /**
   * function to call the remove function that deletes the required employee data,
   * from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
  removeEmployee = (req, res) => {
    //id param for updating exact employee
    const empId = req.params;

    try {
      //calling method to delete employee data
      service.remove(empId, (err, data) => {
        return err
          ? res
              .status(500)
              .send({ success: false, message: 'Some error occurred🤷🏻‍♂️!' })
          : res.status(200).send({
              success: true,
              message: 'Employee deleted successfully',
            });
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || 'Some error occurred!🎊' });
    }
  };

  /**
   * To login the employee and authenticate
   * @param {*} req (express property)
   * @param {*} res (express property)
   */
  loginEmployee(req, res) {
    const employeeCredentials = {
      email: req.body.email,
      password: req.body.password,
    };
    
    //calling a function to login employee
    service.employeeLogin(employeeCredentials, (err, data) => {
      return err
        ? res.status(400).send({ success: false, message: err })
        : res
            .status(200)
            .send({ success: true, message: 'Login successful👍', data: data });
    });
  }
}

//exporting the class
module.exports = new EmployeeController();
