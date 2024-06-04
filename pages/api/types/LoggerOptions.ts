import winston from "winston";

export type LoggerOptions = {
    level?: string;
    transports?: winston.transport[];
  }

