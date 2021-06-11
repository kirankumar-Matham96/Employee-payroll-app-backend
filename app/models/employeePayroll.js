'use strict';
// Importing mongoose module
const mongoose = require('mongoose');

// Schema for the employee-details
const employeeDataSchema = mongoose.Schema(
  //employeeDataSchema
  {
    firstName: String,
    lastName: String,
    department: String,
    salary: String,
    company: String,
  },
  {
    timestamps: true, //to add time stamps
    versionKey: false, //to avoid showing version
  }
);

//assigning to a constant
const employeeDataModel = mongoose.model(
  'employeeDataModel',
  employeeDataSchema
);

// Exporting schema as a module, so that we can directly access the data inside structure.
module.exports = mongoose.model('employeeSchema', employeeDataSchema);

class CRUDOperations {
  //create method
  createEmployee = (newEmployee, callback) => {
    try {
      const employee = new employeeDataModel({
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        department: newEmployee.department || 'Management',
        salary: newEmployee.salary || 'Rs.30,000.00/-',
        company: newEmployee.company || 'ProMax',
      });

      //to save the new data
      employee.save({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //Get all the data from the server
  findAll = (callback) => {
    try {
      employeeDataModel.find({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //get one employee by id
  getDataById = (empId, callback) => {
    try {
      employeeDataModel.findById(empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //update with id
  updateEmpById = (empId, empData, callback) => {
    console.log(`Employee id: ${empId.empId}`);

    try {
      employeeDataModel.findByIdAndUpdate(
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
    } catch (err) {
      callback(err, null);
    }
  };

  //Removing employee with id
  removeEmpById = (empId, callback) => {
    try {
      employeeDataModel.findByIdAndRemove(empId.empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };
}

//exporting class
module.exports = new CRUDOperations();
