/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm employeePayroll.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the functions
 *
 * @description : tests all the pass and fail cases
 *
 * @file        : test/employeePayroll.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Kirankumar Matham <mathamkirankumar96@gmail.com>
 * @version     : _ _ _
 * @since       : 09-06-2021
 *********************************************************************/

//Importing needed modules and dependencies
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const userInput = require('./employeeData.json');
const mocha = require('mocha');
const should = chai.should();

//using chaiHTTP
chai.use(chaiHTTP);

/**
 * @description Test case for registering new user.
 *              Contains both positive and negative cases.
 */
describe('POST - User Registration', () => {
  it('givenValidData_shouldRegisterTheUser', (done) => {
    const userDetails = userInput.registerUserPass;
    chai
      .request(server)
      .post('/registerUser')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have
          .property('message')
          .eql('User registered successfully');
        res.body.should.have.property('data').which.is.an('object');
        err ? done(err) : done();
      });
  });

  it('givenInValidData_when_shouldReturnError', (done) => {
    const userDetails = userInput.registerUserFirstNameFail;
    chai
      .request(server)
      .post('/registerUser')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql(
            `"firstName" with value "${userDetails.firstName}" fails to match the required pattern: /^[A-Z]{1}[A-Za-z]{2,30}/` ||
              'Some error occurred while adding user'
          );
        res.body.should.have.property('data').should.be.a('object');
        err ? done(err) : done();
      });
  });
});

describe('POST - User Login', () => {
  it('givenDetails_whenEmailAndPasswordAreValid_shouldLoginTheUserAndReturnToken', (done) => {
    const userCredentials = userInput.userLoginPass;
    chai
      .request(server)
      .post('/userLogin')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('Login successful👍');
        res.body.should.have.property('data');
        err ? done(err) : done();
      });
  });

  it('givenDetails_whenInvalidEmailAndValidPassword_shouldReturnError', (done) => {
    const userCredentials = userInput.loginWrongEmail;
    chai
      .request(server)
      .post('/userLogin')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have
          .property('message')
          .eql('User not found with email');
        err ? done(err) : done();
      });
  });

  it('givenDetails_whenValidEmailAndInValidPassword_shouldReturnError', (done) => {
    const userCredentials = userInput.userLoginWrongPasswordFail;
    chai
      .request(server)
      .post('/userLogin')
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Wrong password!❌');
        err ? done(err) : done();
      });
  });
});

//method to execute before every test case further
describe('Employee Payroll API', () => {
  let token = '';

  beforeEach((done) => {
    const userData = userInput.userLoginPass;
    chai
      .request(server)
      .post('/userLogin')
      .send(userData)
      .end((err, res) => {
        token = res.body.data;
        res.should.have.status(200);
        if (err) return done(err);
        done();
      });
  });

  /**
   * @description: Test cases for creating new employee object with POST.
   *               Contains positive and negative cases.
   */
  describe('POST - Add New Employee', () => {
    it('givenUserDetails_whenValid_shouldAddNewEmployeeToTheDatabase', (done) => {
      const employeeDetails = userInput.addEmployeePass;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Employee added successfully');
          res.body.should.have.property('data').should.be.a('object');
          if (err) {
            console.log(`error: ${err}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenNameIsInWrongFormat_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat1;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `\"name\" with value \"${employeeDetails.name}\" fails to match the required pattern: /^[A-Z]{1}[\\sA-Za-z]{2,30}/`
            );
          if (err) {
            console.log(`error: ${err}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenNameIsLessThanThreeChars_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat2;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql('"name" length must be at least 3 characters long');
          if (err) {
            console.log(`error: ${err}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenNameIsEmptyString_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat3;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql('"name" is not allowed to be empty');
          if (err) {
            console.log(`error: ${err}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenNameIsNotAString_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat4;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(`"name" must be a string`);
          if (err) {
            console.log(`error: ${err}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenEmailIsInWrongFormat_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidEmailFormat;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"email" with value "${employeeDetails.email}" fails to match the required pattern: /^[a-zA-Z0-9.!#$%&\'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/`
            );
          if (err) {
            console.log(`Error: ${error}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainUpperCaseChar_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat1;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            console.log(`Error: ${error}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainNumber_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat2;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            console.log(`Error: ${error}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainLoweCaseChar_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat3;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            console.log(`Error: ${error}`);
            return done(err);
          }
          done();
        });
    });

    it('givenUserDetails_whenPasswordDoesNotContainSpecialChar_shouldReturnError', (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat4;
      chai
        .request(server)
        .post('/addEmployee')
        .send(employeeDetails)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            console.log(`Error: ${error}`);
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for retrieving all the employees with GET.
   *              Contains positive and negative cases.
   */
  describe('GET - Retrieves All Data', () => {
    it('givenValidRequest_shouldGetAllTheEmployeesData', (done) => {
      chai
        .request(server)
        .get('/getEmployees')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Successfully retrieved the employees data');
          res.body.should.have.property('data').which.is.an('array');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenInValidToken_shouldReturnError', (done) => {
      chai
        .request(server)
        .get('/getEmployees')
        .set('token', token + '1')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('invalid signature');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for retrieving the employee by id with GET.
   *              Contains positive and negative cases.
   */
  describe('GET - Retrieve Employee With ID', () => {
    it('given_ValidTokenAndID_shouldReturnEmployeeData', (done) => {
      chai
        .request(server)
        .get(`/getEmployee/${userInput.getOnePass.id}`)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Employee retrieved successfully');
          res.body.should.have.property('data').which.is.an('object');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('given_InValidTokenAndID_shouldReturnError', (done) => {
      chai
        .request(server)
        .get(`/getEmployee/${userInput.getOneFail.id}`)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('employee not found!🤷🏻‍♀️');
          if (error) {
            return done(error);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for updating the employees by id with PUT.
   *              Contains positive and negative cases.
   */
  describe('PUT - Update Employee Data', () => {
    it('givenValidData_shouldUpdateEmployeeDataSuccessfully', (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.getOnePass.id}`)
        .send(userInput.updateEmployeePass)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Details updated for the employee successfully');
          res.body.should.have.property('data').should.be.a('object');
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it('givenInValidNameFormat_shouldReturnErrorMessage', (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.getOnePass.id}`)
        .send(userInput.addEmployeeInvalidNameFormat1)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              `"name" with value "${userInput.addEmployeeInvalidNameFormat1.name}" fails to match the required pattern: /^[A-Z]{1}[\\sA-Za-z]{2,30}/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenInValidEmailFormat_shouldReturnErrorMessage', (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.getOnePass.id}`)
        .send(userInput.addEmployeeInvalidEmailFormat)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              `"email" with value "${userInput.addEmployeeInvalidEmailFormat.email}" fails to match the required pattern: /^[a-zA-Z0-9.!#$%&\'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/`
            );
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it('givenInValidPasswordFormat_shouldReturnErrorMessage', (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.getOnePass.id}`)
        .send(userInput.updateEmployeeInvalidPasswordFormat1)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              `"password" with value "${userInput.updateEmployeeInvalidPasswordFormat1.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for deleting the employee by id with DELETE.
   *              Contains positive and negative cases.
   */
  describe('DELETE - Removes Employee', () => {
    it('givenValidIDAndToken_shouldDeleteEmployeeDataSuccessfully', (done) => {
      chai
        .request(server)
        .delete(`/deleteEmployee/${userInput.deletePass.id}`)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Employee deleted successfully');
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it('givenInValidIDAndValidToken_shouldReturnErrorMessage', (done) => {
      chai
        .request(server)
        .delete(`/deleteEmployee/${userInput.getOneFail.id}`)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('message')
            .eql('Some error occurred🤷🏻‍♂️!');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
