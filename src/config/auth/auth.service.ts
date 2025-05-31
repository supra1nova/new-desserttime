import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async jwtLogIn(req: any) {
    const payload: Payload = { email: req.memberEmail, id: req.memberId, name: req.memberName };

    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
