/**
 * Author: Kirankumar Matham
 * Resources: Some middleware used by importing other files.
 * Purpose:
 *  To control all the requests and responses.
 *  It will redirect the requests to service layer.
 *  Receives the response from the service layer.
 */
'use strict';
// Importing module from service.js
const service = require('../services/employeePayroll.js');

//Importing middle ware to validate schema (joi validator)
const { validateInput } = require('../middleware/validation');

//ES6-feature: using class
class EmployeeController {
  /**
   * function to call the create function from service.js (creates new employee)
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns success or failure message
   */
  addEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res
          .status(400)
          .send({ message: userInputValidation.error.details[0].message });
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
          : res
              .status(201)
              .send({ message: 'Employee added successfully', data: data });
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || 'Some error occurred!🎈' });
    }
  };

  /**
   * function to call the getAll function that gets all the data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns all the data from the server
   */
  getAllEmployees = (req, res) => {
    try {
      service.getAllEmp((err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message: err.message || 'some error occurred',
            })
          : res.status(200).send(data);
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || 'Some error occurred!🎆' });
    }
  };

  /**
   * function to call the getOne function that gets the required employee data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns employee with given id
   */
  getOneEmployee = (req, res) => {
    const empId = req.params;
    try {
      service.getOne(empId, (err, data) => {
        return err
          ? res.status(500).send({
              message:
                err.message || 'some error occurred while getting the data',
            })
          : res
              .status(200)
              .send({ success: true, data: data || 'employee not found!🤷🏻‍♀️' });
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || 'Some error occurred!🧨' });
    }
  };

  /**
   * function to call the update function that updates the required employee data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns success or failure or error message
   */
  updateEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res
          .status(400)
          .send({ message: userInputValidation.error.details[0].message });
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
              message: `Details updated for the employee with id: ${empId}`,
              data: data,
            });
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || 'Some error occurred!🎎' });
    }
  };

  /**
   * function to call the remove function that deletes the required employee data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns success or failure or error message
   */
  removeEmployee = (req, res) => {
    //id param for updating exact employee
    const empId = req.params;

    try {
      //calling method to delete employee data
      service.remove(empId, (err, data) => {
        return err
          ? res.status(500).send({ message: 'Some error occurred🤷🏻‍♂️!' })
          : res.status(200).send({
              success: true,
              message: `Employee with id: ${empId.empId} deleted successfully`,
            });
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || 'Some error occurred!🎊' });
    }
  };

  /**
   *
   */
  loginEmployee(req, res) {
    const employeeCredentials = {
      email: req.body.email,
      password: req.body.password,
    };

    service.employeeLogin(employeeCredentials, (err, data) => {
      console.log(`error: ${err}`);
      return err
        ? res
            .status(500)
            .send({ message: err.message || 'Some error occurred!🎗' })
        : res.status(200).send(data);
    });
  }
}

//exporting the class
module.exports = new EmployeeController();
