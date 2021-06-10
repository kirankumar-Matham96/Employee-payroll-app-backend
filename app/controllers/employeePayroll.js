// importing module from service.js
const service = require('../services/employeePayroll.js');

class EmployeeController {
  /**
   * function to call the create function from service.js (creates new employee)
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns success or failure message
   */
  addEmployee = (req, res) => {
    //Object for the new employee data
    const newEmployee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      salary: req.body.salary,
      company: req.body.company,
    };

    service.addNewEmployee(newEmployee, (err, data) => {
      return err
        ? res.status(500).send({
            success: false,
            message: err.message || 'Some error occurred while adding employee',
          })
        : res
            .status(200)
            .send({ message: 'Employee added successfully', data: data });
    });
  };

  /**
   * function to call the getAll function that gets all the data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns all the data from the server
   */
  getAllEmployees = (req, res) => {
    service.getAllEmp((err, data) => {
      return err
        ? res.status(500).send({
            success: false,
            message: err.message || 'some error occurred',
          })
        : res.status(200).send(data);
    });
  };

  /**
   * function to call the getOne function that gets the required employee data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns employee with given id
   */
  getOneEmployee = (req, res) => {
    const empId = req.params;

    service.getOne(empId, (err, data) => {
      return err
        ? res.status(500).send({
            message:
              err.message || 'some error occurred while getting the data',
          })
        : res.status(200).send({ success: true, data: data });
    });
  };

  /**
   * function to call the update function that updates the required employee data, from the service.js
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns success or failure or error message
   */
  updateEmployee = (req, res) => {
    //id param for updating exact employee
    const empId = req.params;

    //employee updated details from client
    const updatedDetails = {
      id: req.params.empId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      salary: req.body.salary,
      company: req.body.company,
    };

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

    service.remove(empId, (err, data) => {
      return err
        ? res.status(500).send({ message: 'Some error occurred!' })
        : res.status(200).send({
            success: true,
            message: `Employee with id: ${empId} deleted successfully`,
          });
    });
  };
}

//exporting the class
module.exports = new EmployeeController();
