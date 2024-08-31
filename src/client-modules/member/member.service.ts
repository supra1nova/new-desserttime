import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { MemberRepository } from './member.repository';
import { LoginDto } from './dto/login.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}
  @Transactional()
  async memberSignIn(signInDto: SignInDto) {
    try {
      const isMember = await this.memberRepository.findMemberOne(signInDto.snsId, signInDto.memberEmail);
      if (!isMember) {
        await this.memberRepository.insertMember(signInDto);
      } else {
        throw new BadRequestException('중복정보', {
          cause: new Error(),
          description: '이미 등록된 사용자입니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  @Transactional()
  async memberLogIn(loginDto: LoginDto) {
    try {
      const memberData = await this.memberRepository.memberLogin(loginDto);
      if (!memberData) {
        throw new BadRequestException('미등록정보', {
          cause: new Error(),
          description: '가입되지않은 정보입니다.',
        });
      }
      memberData.nickName = '1번째 상큼한 복숭아';
      return memberData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
