const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const logger = createLogger({
  transports: [
    //to print/send to the consol
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.simple()), //to print in json format
      //   format: format.combine(format.timestamp(),format.simple())//to print simple format
    }),

    //to print/send info to the file
    new transports.File({
      filename: './log files/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),

    //to print/send errors to the file
    new transports.File({
      filename: './log files/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),

    //to send to mongodb
    new transports.MongoDB({
      level: 'info', //['error', 'info'],
      db: process.env.DATABASE_URL,
      collection: 'payrollLogs',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],

  //exception handler
  ExceptionHandler: [
    new transports.File({
      filename: './log files/exceptions.log',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],

  //setting winston to not exit on error
  exitOnError: false,
});

module.exports = logger;
