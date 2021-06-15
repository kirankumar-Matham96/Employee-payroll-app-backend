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
  it('givenUserDetails_whenValid_shouldAddNewEmployeeToTheDatabase', (done) => {
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
    const employeeDetails = userInput.addEmployeeInvalidNameFormat1;
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
    const employeeDetails = userInput.addEmployeeInvalidNameFormat2;
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
    const employeeDetails = userInput.addEmployeeInvalidNameFormat3;
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
    const employeeDetails = userInput.addEmployeeInvalidNameFormat4;
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
    const employeeDetails = userInput.addEmployeeInvalidEmailFormat;
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
    const employeeDetails = userInput.addEmployeeInvalidPasswordFormat1;
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
    const employeeDetails = userInput.addEmployeeInvalidPasswordFormat2;
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
    const employeeDetails = userInput.addEmployeeInvalidPasswordFormat3;
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
    const employeeDetails = userInput.addEmployeeInvalidPasswordFormat4;
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
});
