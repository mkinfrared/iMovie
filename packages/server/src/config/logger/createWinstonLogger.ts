/* eslint-disable no-shadow */
import { createLogger, format, transports } from "winston";

const { printf, combine, timestamp } = format;
const getMeta = format((info) => {
  return { ...info, context: info.context };
});
const myFormat = printf(({ level, message, label, timestamp, context }) => {
  return `${timestamp} [${context}] ${level}: ${message}`;
});

const createWinstonLogger = () => {
  return createLogger({
    format: combine(getMeta(), timestamp(), myFormat),
    transports: [
      new transports.File({
        dirname: "logs",
        filename: "all-logs.log"
      }),
      new transports.File({
        level: "info",
        dirname: "logs",
        filename: "info.log"
      }),
      new transports.File({
        level: "debug",
        dirname: "logs",
        filename: "debug.log"
      }),
      new transports.File({
        level: "error",
        dirname: "logs",
        filename: "error.log"
      }),
      new transports.File({
        level: "verbose",
        dirname: "logs",
        filename: "verbose.log"
      }),
      new transports.File({
        level: "warn",
        dirname: "logs",
        filename: "warn.log"
      })
    ]
  });
};

export default createWinstonLogger;
