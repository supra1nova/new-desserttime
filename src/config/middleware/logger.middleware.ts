import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { winstonLogger } from '../logger/winston.util';
// import { Payload } from '../../auth/jwt/jwt.payload';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
//   constructor(private readonly jwt: JwtService) {}
  private logger = new Logger('dessert-time');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers } = req;
    const { statusCode } = res;
    const userAgent = req.get('user-agent');

    // const authorization: string = headers.authorization;
    // const payload = authorization
    //   ? <Payload>this.jwt.decode(authorization.split(' ')[1])
    //   : null;
    // const userId = payload ? payload.sub : 0;
    const datetime = new Date();

    winstonLogger.log(
      `${datetime}  method-${method}  originalUrl-${originalUrl}  statusCode-${statusCode}  ip-${ip}  userAgent-${userAgent}`,
    ); // USERID-${userId} 
    res.on('finish', () => {  
        const errorResponse = {
          timestamp: new Date(),
          originalUrl,
          method: method,
          ip,
        };
        if (statusCode >= 500) {
            winstonLogger.error(errorResponse);
          } else if (statusCode >= 400) {
            winstonLogger.warn(errorResponse);
          }
    });
    next();
  }
}
