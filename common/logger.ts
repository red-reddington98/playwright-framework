import * as winston from 'winston';
import {LoggerOptions} from '../pages/api/types/LoggerOptions'


export default class Logger {
  private logger: winston.Logger;
  constructor(options: LoggerOptions = {}) {
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

  log(level: string, message: string): void {
    this.logger.log(level, message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }


}