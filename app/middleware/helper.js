/**
 * Author: Kirankumar Matham
 * Resources: bcrypt, dotenv, JWT(jsonwebtoken).
 * Purpose:
 *  To authenticate the encrypted password.
 *  To generate the JWT.
 *  To authenticate the JWT in the login time. *  
 */

'use strict'
//importing .env file
require('dotenv').config();

//importing bcrypt module
const bcrypt = require('bcrypt');

//importing jsonwebtoken module
const JWT = require('jsonwebtoken');

class bcryptHelper {
  /**
   *
   */
  accessTokenGenerator(empData) {
    return JWT.sign(empData, process.env.SECRET_ACCESS_TOKEN, {
      expiresIn:'10000s',
    });
  }

  /**
   * Method to compare given password and actual password
   * stored in the database.
   * @param {*} clientPassword password string provided by the user/client
   * @param {*} dbSavedPassword salted and hashed password stored in the database
   * @returns boolean value:
   *          -> if both passwords are equal. returns true.
   *          -> else, return false.
   */
  passwordCheckWithBCrypt(clientPassword, dbSavedPassword) {
    return (clientPassword && dbSavedPassword)
      ? (!bcrypt.compareSync(clientPassword, dbSavedPassword))
      : false;
  }

  /**
   *
   */
  checkJWToken(req, res, next) {
    const jToken = req.get('token');

    if (jToken) {
      JWT.verify(jToken, process.env.SECRET_ACCESS_TOKEN, (err) => {
        if (err) {
          console.log('Error: ', err);
          return res.status(400).send({
            success: false,
            message: err.message || 'Invalid token!',
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: 'User is not authorized until token is provided!',
      });
    }
  }
}

//exporting module
module.exports = new bcryptHelper();
