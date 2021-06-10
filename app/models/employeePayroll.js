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
    const employee = new employeeDataModel({
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

  //Get all the data from the server
  findAll = (callback) => {
    employeeDataModel.find({}, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  //get one employee by id
  getDataById = (empId, callback) => {
    employeeDataModel.findById(empId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  //update with id
  updateEmpById = (empId, empData, callback) => {
    console.log(`Employee id: ${empId}`);
    employeeDataModel.findByIdAndUpdate(
      empId,
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
  };

  //Removing employee with id
  removeEmpById = (empId, callback) => {
    employeeDataModel.findByIdAndRemove(empId.empId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

//exporting class
module.exports = new CRUDOperations();
