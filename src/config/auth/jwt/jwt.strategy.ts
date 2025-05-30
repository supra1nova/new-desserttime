import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
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
    private configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      console.log('secret ::::::', secret);
      console.log('process.env.JWT_SECRET::::', process.env.JWT_SECRET);
      //throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'efofhieeiir3r3939r39ry8f7ggawjrpu308y7gjcaoeir9ur8yfhsoujjoaie930w8ryiufdhjksdwhegy34tu89gredrisueywghqju', //configService.get<string>('JWT_SECRET'), //process.env.JWT_SECRET,
      ignoreExpiration: false, //만료기간
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
      where: { memberId, isUsable: true },
    });

    if (member) {
      return member;
    } else {
      throw new UnauthorizedException();
    }
  }
}
