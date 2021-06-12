//importing bcrypt module
const bcrypt = require('bcrypt');

class bcryptHelper {
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
    return clientPassword && dbSavedPassword
      ? bcrypt.compareSync(clientPassword, dbSavedPassword)
      : false;
  }
}

//exporting module
module.exports = new bcryptHelper();
