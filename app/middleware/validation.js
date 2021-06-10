const { string } = require('@hapi/joi');
const Joi = require('@hapi/joi');

const validateInput = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[A-Z]{1}[A-Za-z]{2,30}'))
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[A-Z]{1}[A-Za-z]{2,30}'))
    .required(),
  department: Joi.string(),
  salary: Joi.string(),
  company: Joi.string(),
});

module.exports = { validateInput };
