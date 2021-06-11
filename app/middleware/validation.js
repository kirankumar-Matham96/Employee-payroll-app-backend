'use strict'
//importing property/function for joi
const { string } = require('@hapi/joi');

//importing joi module
const Joi = require('@hapi/joi');

//joi validating object
const validateInput = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[A-Z]{1}[A-Za-z]{2,30}'))
    .required(),
  lastName: Joi.string()//use name
    .min(3)
    .max(30)
    .pattern(new RegExp('^[A-Z]{1}[A-Za-z]{2,30}'))
    .required(),
  department: Joi.string(),
  salary: Joi.string(),
  company: Joi.string(),
});

//exporting module
module.exports = { validateInput };
