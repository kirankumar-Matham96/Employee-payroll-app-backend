/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm employeePayroll.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the functions
 *
 * @description
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

//TODO: test case for login and register.

//method to execute before every test case further
describe('Employee Payroll API', () => {
  let token = '';

  beforeEach((done) => {
    chai
      .request(server)
      .post('/employee/login')
      .send(userInput.loginPass)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        if (err) {
          return done(err);
        }
        done();
      });
  });

  /**
 * Test cases for creating new employee object with POST.
 * Contains positive and negative cases.
 */
describe('POST - Add New Employee', () => {
  it('givenUserDetails_whenValid_shouldAddNewEmployeeToTheDatabase', (done) => {
    const employeeDetails = userInput.addEmployeePass;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
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
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        // res.body.should.have
        //   .property('message')
        //   .eql('Employee added successfully');
        if (err) {
          console.log(`Error: ${error}`);
          return done(err);
        }
        done();
      });
  });
});


  /**
  * Test cases for retrieving all the employees with GET.
  * Contains positive and negative cases.
  */
  describe('GET - Retrieves All Data', () => {
    it('givenValidRequest_shouldGetAllTheEmployeesData', (done) => {
      chai
        .request(server)
        .get('/employees')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Successfully retrieved the employees data');
          res.body.should.have.property('data').should.be.a('object');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenInValidToken_shouldGetAllTheEmployeesData', (done) => {
      chai
        .request(server)
        .get('/employees')
        .set('token', token + '1')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          // res.body.should.have
          //   .property('message')
          //   .eql('');
          res.body.should.have.property('data').should.be.a('object');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
  * Test cases for retrieving the employee by id with GET.
  * Contains positive and negative cases.
  */
  describe('GET - Retrieve Employee With ID', () => {
    it('given_ValidTokenAndID_shouldReturnEmployeeData', (done) => {
      chai
        .request(server)
        .get(`/getEmployee/${userInput.getOnePass}`)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Employee retrieved successfully');
          res.body.should.have.property('data').should.be.a('object');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('given_InValidTokenAndID_shouldReturnError', (done) => {
      chai
        .request(server)
        .get(`/getEmployee/${userInput.getOneFail}`)
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
  * Test cases for updating the employees by id with PUT.
  * Contains positive and negative cases.
  */
  describe('PUT - Update Employee Data', () => {
    it('givenValidData_shouldUpdateEmployeeDataSuccessfully', (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.updateEmployeePass}`)
        .send(userInputs.employeePutPos)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have
            .property('message')
            .eql('Employee info updated!');
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
        .put(`/updateEmployee/${userInput.addEmployeeInvalidNameFormat1}`)
        .send(userInputs.employeePutNeg)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('givenInValidEmailFormat_shouldReturnErrorMessage', (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.addEmployeeInvalidEmailFormat}`)
        .send(userInputs.employeePutNegEmail)
        .set('token', token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('');
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it('givenInValidPasswordFormat_shouldReturnErrorMessage', (done) => {
      chai
        .request(server)
        .put(
          `/updateEmployee/${userInput.updateEmployeeInvalidPasswordFormat1}`
        )
        .send(userInput.updateEmployeeInvalidPasswordFormat1)
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
  * Test cases for deleting the employee by id with DELETE.
  * Contains positive and negative cases.
  */
  describe('DELETE - Removes Employee', () => {
    it('givenValidIDAndToken_shouldDeleteEmployeeDataSuccessfully', (done) => {
      chai
        .request(server)
        .delete(`/deleteEmployee/${userInput.deletePass}`)
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
        .delete(`/deleteEmployee/${userInput.deleteFail}`)
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
