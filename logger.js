module.exports.logger = function(){
  var winston = require('winston');
  var logger = new (winston.Logger)({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'all-logs.log' })
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exceptions.log' })
    ]
  });
  logger.level = 'debug';
  return logger;
}
