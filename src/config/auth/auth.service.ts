import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async jwtLogIn(reqData: any) {
    const payload: Payload = { name: reqData.memberEmail, id: reqData.memberId };

    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
