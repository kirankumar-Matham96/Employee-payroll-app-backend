/**
 * Author: Kirankumar Matham
 * Resources: @hapi/joi
 * Purpose:
 *  To validate the input data from the user.
 */
'use strict';
//importing property/function for joi
const { string } = require('@hapi/joi');

//importing joi module
const Joi = require('@hapi/joi');

//joi validating object
const validateInput = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[A-Z]{1}[\\sA-Za-z]{2,30}'))
    .required(),
  email: Joi.string()
    .pattern(
      new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      )
    )
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    )
    .required(),
  phoneNumber: Joi.string()
    .pattern(new RegExp('^[+]{1}[(]?([0-9]{1,3})[)]?\\s[0-9]{10}$'))
    .required(),
  department: Joi.string(),
  salary: Joi.string(),
  company: Joi.string(),
});

//exporting module
module.exports = { validateInput };
