/**
 * Author: Kirankumar Matham
 * Resources: Mongoose, bcrypt.
 * Purpose:
 *  To create a schema model.
 *  To handle the CRUD operations.
 *  To encrypt the password while adding new object and while updating the password.
 */

'use strict';
// Importing mongoose module
const mongoose = require('mongoose');

//Importing bcrypt
const bcrypt = require('bcrypt');

//assigning salt rounds
const SALT_ROUNDS = 10;

// Schema for the employee-details
const employeeDataSchema = mongoose.Schema(
  //employeeDataSchema
  {
    name: {
      type: String,
      require: true,
      validate: /^[A-Z]{1}[\\sA-Za-z]{2,30}/,
    },
    email: {
      type: String,
      require: true,
      validate:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: {
      type: String,
      require: true,
      validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    },
    phoneNumber: {
      type: String,
    },
    department: String,
    salary: String,
    company: String,
  },
  {
    timestamps: true, //to add time stamps
    versionKey: false, //to avoid showing version
  }
);

/**
 * function to make hashed password.
 */
employeeDataSchema.pre('save', function (next) {
  // const employee = this;
  var employee = this;

  // if (!employee.isModified('password')) {
  //   return next();
  // }
  //generating salt and adding to hashed password, then replacing password with hash
  bcrypt.hash(employee.password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    employee.password = hashedPassword;
    next();
  });

  //re-routing to the next middleware
  // next();
});

//comparing passwords for the authentication
employeeDataSchema.methods.comparePasswords = (clientsPassword, callback) => {
  bcrypt.compare(clientsPassword, this.password, (err, matched) => {
    return err ? callback(err, null) : callback(null, matched);
  });
};

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
        name: newEmployee.name,
        email: newEmployee.email,
        password: newEmployee.password,
        phoneNumber: newEmployee.phoneNumber,
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
          name: empData.name,
          email: empData.email,
          password: empData.password,
          phoneNumber: empData.phoneNumber,
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

  /**
   *
   */
  loginEmp(clientCredentials, callback) {
    employeeDataModel.findOne(
      { email: clientCredentials.email },
      (err, data) => {
        console.log(`data in login model: ${data}`);
        if (err) {
          return callback(err, null);
        } else if (!data) {
          return callback('User not found with email', null);
        }
        return callback(null, data);
      }
    );
  }
}

//exporting class
module.exports = new CRUDOperations();
