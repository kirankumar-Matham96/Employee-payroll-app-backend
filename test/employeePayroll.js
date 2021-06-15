/**
 * Author: Kirankumar Matham
 * Resources: Mocha, Chai, Chai-HTTP and Isthambul/nyc(for code coverage).
 * Purpose:
 *  To test all the pass and fail cases when the user gave wrong input.
 *  To test the functions if they are all working fine.
 */

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const userInput = require('./employeeData.json');
const mocha = require('mocha');

const should = chai.should();
// const assert = chai.assert();
chai.use(chaiHTTP);

/**
 * Test cases for creating new employee object
 */
describe('POST Add New Employee', () => {
  it('givenUserDetails_whenProper_shouldAddNewEmployeeToTheDatabase', (done) => {
    const employeeDetails = userInput.addEmployeePass;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        // res.body.should.have.property('success').eql(true);
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
    const employeeDetails = userInput.addEmployeeWrongName1;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`error: ${err}`);
          return done(err);
        }
        done();
      });
  });

  it('givenUserDetails_whenNameIsLessThanThreeChars_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongName2;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`error: ${err}`);
          return done(err);
        }
        done();
      });
  });

  it('givenUserDetails_whenNameIsEmptyString_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongName3;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`error: ${err}`);
          return done(err);
        }
        done();
      });
  });

  it('givenUserDetails_whenNameIsNotAString_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongName4;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`error: ${err}`);
          return done(err);
        }
        done();
      });
  });

  it('givenUserDetails_whenEmailIsInWrongFormat_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongEmail;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`Error: ${error}`);
          return done(err);
        }
        done();
      });
  });
  //password1
  it('givenUserDetails_whenPasswordDoesNotContainUpperCaseChar_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongPassword1;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`Error: ${error}`);
          return done(err);
        }
        done();
      });
  });

  //password2
  it('givenUserDetails_whenPasswordDoesNotContainNumber_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongPassword2;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`Error: ${error}`);
          return done(err);
        }
        done();
      });
  });

  //password3:
  it('givenUserDetails_whenPasswordDoesNotContainLoweCaseChar_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongPassword3;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`Error: ${error}`);
          return done(err);
        }
        done();
      });
  });

  //password4:
  it('givenUserDetails_whenPasswordDoesNotContainSpecialChar_shouldReturnError', (done) => {
    const employeeDetails = userInput.addEmployeeWrongPassword4;
    chai
      .request(server)
      .post('/addEmployee')
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        if (err) {
          console.log(`Error: ${error}`);
          return done(err);
        }
        done();
      });
  });

  // //phone number1:
  // it('givenUserDetails_whenPhoneNumberIsInAWrongFormat_shouldReturnError', (done) => {
  //   const employeeDetails = userInput.addEmployeeWrongPhoneNumber1;
  //   chai
  //     .request(server)
  //     .post('/addEmployee')
  //     .send(employeeDetails)
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.body.should.be.a('object');
  //       if (err) {
  //         console.log(`Error: ${error}`);
  //         return done(err);
  //       }
  //       done();
  //     });
  // });

  // //phone number2:
  // it('givenUserDetails_whenPhoneNumberIsInAWrongFormat_shouldReturnError', (done) => {
  //   const employeeDetails = userInput.addEmployeeWrongPhoneNumber2;
  //   chai
  //     .request(server)
  //     .post('/addEmployee')
  //     .send(employeeDetails)
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.body.should.be.a('object');
  //       if (err) {
  //         console.log(`Error: ${error}`);
  //         return done(err);
  //       }
  //       done();
  //     });
  // });
});
