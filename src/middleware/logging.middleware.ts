/**
 * import the required external modules and interfaces
 */
import winston from "winston";
import morgan from "morgan";

const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
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
});

