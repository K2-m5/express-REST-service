const morgan = require('morgan');
morgan.token('query', req => {
  return JSON.stringify(req.query);
});

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

const { createLogger, format, transports } = require('winston');

const logger = new createLogger({
  transports: [
    // new transports.Console({
    //   level: 'info',
    //   format: format.combine(format.colorize(), format.cli())
    // }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.prettyPrint())
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.prettyPrint())
    })
  ]
});

logger.stream = {
  write(message) {
    const mesChunk = message.split(' ');
    const status = mesChunk[1];
    if (status >= 400) {
      logger.error(message);
    } else {
      logger.info(message);
    }
  }
};

process
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled Rejection at Promise: ${reason.message}`);
    process.exitCode = 1;
  })
  .on('uncaughtException', error => {
    logger.error(`Uncaught Exception: ${error}`);
    process.exitCode = 1;
  });

module.exports = { morgan, logger };
