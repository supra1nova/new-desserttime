import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { WinstonModule, utilities } from 'nest-winston';


const dailyOption = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD', //파일에 기록될 날짜패턴
    dirname: process.cwd() + `/logs/${level}`, //`./logs/${level}` //파일이 저장될 디렉토리 경로
    filename: `%DATE%.${level}.log`, //파일 명
    maxFiles: 30, //파일이 저장될 일 수
    zippedArchive: true, //로그가 쌓이면 압축해서 관리
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        utilities.format.nestLike('Training-WAS', {
          colors: true,
          prettyPrint: true, //코드포멧, 이쁘게 쓰겠다~
        }),
      ),
    }),
    new winstonDaily(dailyOption('error')),
    new winstonDaily(dailyOption('warn')),
    new winstonDaily(dailyOption('info')),
  ],
});
