/**
 * Importing mongoose module
 */
const mongoose = require('mongoose');

/**
 * Schema for the employee-details
 */
const employeeData = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    department: String,
    salary: String,
    company: String,
  },
  {
    versionKey: false,
  }
);

/**
 * exporting schema as a module,
 * so that we can directly access the data inside structure.
 */
module.exports = mongoose.model('employeeData', employeeData);
