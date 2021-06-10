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

//create method
exports.create = (newEmployee, callback) => {
  const employee = new Employee({
    firstName: newEmployee.firstName,
    lastName: newEmployee.lastName,
    department: newEmployee.department || 'Management',
    salary: newEmployee.salary || 'Rs.30,000.00/-',
    company: newEmployee.company || 'ProMax',
  });

  employee.save({}, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

// Exporting schema as a module, so that we can directly access the data inside structure.
module.exports = mongoose.model('employeeSchema', employeeDataSchema);
