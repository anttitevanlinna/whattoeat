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

  var awsoptions = {
    logGroupName: 'whaddaeat',
    logStreamName: 'applicationlog',
    awsRegion: 'eu-west-1'
  };
  logger.add(require('winston-cloudwatch'), awsoptions);

  logger.level = 'debug';
  return logger;
}
