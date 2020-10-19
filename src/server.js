const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./middleware/logger');

process
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled Rejection at Promise: ${reason.message}`);
    process.exitCode = 1;
  })
  .on('uncaughtException', error => {
    logger.error(`Uncaught Exception: ${error}`);
    process.exitCode = 1;
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
