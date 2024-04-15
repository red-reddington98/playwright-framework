import * as winston from 'winston';


export default class Logger {
  constructor(options = {}) {
    const {
      level = 'info',
      transports = [new winston.transports.Console()]
    } = options;

    const combinedFormat = winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    );

    this.logger = winston.createLogger({
      level,
      format: combinedFormat,
      transports
    });
  }

  log(level, message) {
    this.logger.log(level, message);
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(message) {
    this.logger.error(message);
  }


}
