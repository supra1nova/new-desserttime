import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberRepository } from 'src/client-modules/member/member.repository';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService, //토큰반환을 위한것
  ) {}
  async jwtLogIn(reqData: any) {
    const payload: Payload = { name: reqData.memberName, id: reqData.memberId };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: 'efofhieeiir3r3939r39ry8f7ggawjrpu308y7gjcaoeir9ur8yfhsoujjoaie930w8ryiufdhjksdwhegy34tu89gredrisueywghqju', //process.env.JWT_SECRET,
      }),
    };
  }
}
