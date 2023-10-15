/**
 * import the required external modules and interfaces
 */
import winston from "winston";

const { combine, timestamp, json } = winston.format;

interface ILoggerConfig {
    levels: typeof winston.config.syslog.levels;
    format: winston.Logform.Format;
    defaultMeta: { [key: string]: any };
    transports: winston.transport[] | winston.transport;
    exceptionHandlers: any;
}

function createLogger(config: ILoggerConfig): winston.Logger {
    return winston.createLogger({
      levels: config.levels,
      format: config.format,
      defaultMeta: config.defaultMeta,
      transports: config.transports,
      exceptionHandlers: config.exceptionHandlers,
    });
  }

  const loggerConfig: ILoggerConfig = {
    levels: winston.config.syslog.levels,
    format: combine(
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        json()
    ),
    defaultMeta: { component: 'contact-service' },
    transports: [new winston.transports.Console()],
    exceptionHandlers: [
        new winston.transports.Console(),
      ]
}

export const logger = createLogger(loggerConfig);

