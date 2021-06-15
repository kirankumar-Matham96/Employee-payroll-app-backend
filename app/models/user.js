/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Have the schema for database.
 *
 * @description
 *
 * @file        : models/employeePayroll.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : this is necessary to perform CRUD operations, login and store the data
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 09-06-2021
 *********************************************************************/

 'use strict';

 // Importing mongoose module
 const mongoose = require('mongoose');
 
 //Importing bcrypt
 const bcrypt = require('bcrypt');
 
 //assigning salt rounds
 const SALT_ROUNDS = 10;
 
 // Schema for the employee-details
 const employeeSchemaModel = mongoose.Schema(
   {
     firstName: {
       type: String,
       require: true,
       validate: /^[A-Z]{1}[\\sA-Za-z]{2,30}/,
     },
     lastName: {
        type: String,
        require: true,
        validate: /^[A-Z]{1}[\\sA-Za-z]{2,30}/,
      },
     email: {
       type: String,
       require: true,
       validate:
         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
       unique: true, //<check
     },
     password: {
       type: String,
       require: true,
       validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
     }
   },
   {
     timestamps: true, //to add time stamps
     versionKey: false, //to avoid showing version
   }
 );
 
 /**
  * function to make hashed password.
  */
 employeeSchemaModel.pre('save', function (next) {
   // const employee = this;
   var employee = this;
 
   //generating salt and adding to hashed password, then replacing password with hash
   bcrypt.hash(employee.password, SALT_ROUNDS, (err, hashedPassword) => {
     if (err) {
       return next(err);
     }
     employee.password = hashedPassword;
 
     //re-routing to the next middleware
     next();
   });
 });
 
 //comparing passwords for the authentication
 employeeSchemaModel.methods.comparePasswords = (clientsPassword, callback) => {
   bcrypt.compare(clientsPassword, this.password, (err, matched) => {
     return err ? callback(err, null) : callback(null, matched);
   });
 };
 
 //assigning schema to a constant
 const employeeDataModel = mongoose.model(
   'employeeDataModel',
   employeeSchemaModel
 );
 
 // Exporting schema as a module, so that we can directly access the data inside structure.
 module.exports = mongoose.model('employeeSchema', employeeSchemaModel);
 
 class CRUDOperations {
   //create method
   createEmployee = (newEmployee, callback) => {
     try {
       const employee = new employeeDataModel({
         firstName: newEmployee.firstName,
         lastName: newEmployee.lastName,
         email: newEmployee.email,
         password: newEmployee.password
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
           email: empData.email,
           password: empData.password,
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
 
   //To login
   loginEmp(clientCredentials, callback) {
     employeeDataModel.findOne(
       { email: clientCredentials.email },
       (err, data) => {
         if (err) return callback(err, null);
         else if (!data) return callback('User not found with email', null);
         return callback(null, data);
       }
     );
   }
 }
 
 //exporting class
 module.exports = new CRUDOperations();
 