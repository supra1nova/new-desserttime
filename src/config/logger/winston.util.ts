import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { WinstonModule, utilities } from 'nest-winston';

const isProd = process.env.NODE_ENV === 'production';

const createDailyTransport = (level: string) =>
  new winstonDaily({
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: `${process.cwd()}/logs/${level}`,
    filename: `%DATE%_${level}.log`,
    maxFiles: '7d',
    zippedArchive: true,
  });

const consoleTransport = new winston.transports.Console({
  level: isProd ? 'info' : 'silly',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    utilities.format.nestLike(isProd ? 'DT-PRD' : 'DT-DEV', {
      colors: true,
      prettyPrint: true,
    }),
  ),
});

const transports: winston.transport[] = [consoleTransport];

if (isProd) {
  transports.push(createDailyTransport('error'), createDailyTransport('warn'), createDailyTransport('info'));
}

export const winstonLogger = WinstonModule.createLogger({ transports });
