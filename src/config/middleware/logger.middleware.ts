import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { winstonLogger } from '../logger/winston.util';
// import { JwtService } from '@nestjs/jwt';
// import { Payload } from '../../auth/jwt/jwt.payload';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //   constructor(private readonly jwt: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers } = req;
    const { statusCode } = res;
    const userAgent = req.get('user-agent');

    // const authorization: string = headers.authorization;
    // const payload = authorization  ? <Payload>this.jwt.decode(authorization.split(' ')[1]) : null;
    // const userId = payload ? payload.sub : 0;

    const accessData = {
      timestamp: new Date(),
      originalUrl,
      method: method,
      ip,
      statusCode,
      userAgent,
    };

    winstonLogger.log({ accessData }); // USERID-${userId}

    res.on('finish', () => {});
    next();
  }
}
