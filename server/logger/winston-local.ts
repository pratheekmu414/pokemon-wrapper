const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }: any) => {
  return `${timestamp} [${level}]: ${message}`;
});

const localLogger = () => {
  return createLogger({
    level: 'info',
    format: combine(format.colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
};

export { localLogger };
