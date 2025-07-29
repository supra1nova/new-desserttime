import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Member } from 'src/config/entities/member.entity';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Member)
    private userRepository: Repository<Member>,
  ) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    //인증부분 가드가 여기를 바로 실행시킨다.
    const memberId = payload.id;
    const member = await this.userRepository.findOne({
      select: {
        memberId: true,
        memberName: true,
      },
      where: { memberId },
    });

    if (!member) {
      throw new UnauthorizedException();
    }
    return member;
  }
}
