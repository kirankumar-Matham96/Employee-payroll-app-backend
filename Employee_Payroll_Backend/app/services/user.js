/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database
 *
 * @description
 *
 * @file        : service/user.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : this is necessary to perform CRUD operations
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 09-06-2021
 *********************************************************************/

 'use strict';

 // Importing the database structure or model
 const userSchema = require('../models/user');
 
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
   registerNewEmployee = (newUser, callback) => {
     try {
       //calling the method to create new employee object with given data
       userSchema.newUserRegistration(newUser, (err, data) => {
         return err ? callback(err, null) : callback(null, data);
       });
     } catch (err) {
       callback(err || 'Some error occurred!', null);
     }
   };
 
   /**
    * To authorize the user
    * @param {object} userCredentials data from client(email and password)
    * @param {function} callback callback function
    */
   userLogin(userCredentials, callback) {
     const token = helper.accessTokenGenerator(userCredentials);
     userSchema.loginUser(userCredentials, (err, data) => {
       if (err) {
         return callback(err, null);
       } else if (
         !helper.passwordCheckWithBCrypt(userCredentials.password, data.password)
       ) {
         return callback('Wrong password!❌', null);
       }
       return callback(null, token);
     });
   }
 }
 
 //exporting class
 module.exports = new ServiceMethods();
 