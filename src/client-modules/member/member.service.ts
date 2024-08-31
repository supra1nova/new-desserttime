import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { MemberRepository } from './member.repository';
import { Transactional } from 'typeorm-transactional';
import { UserValidationDto } from './dto/login.dto';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  /**
   * 회원가입
   * @param signInDto
   */
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

  /**
   * 사용자 유효성검사
   * @param userValidationDto
   * @returns
   */
  @Transactional()
  async memberValidate(userValidationDto: UserValidationDto) {
    try {
      const memberData = await this.memberRepository.memberValidate(userValidationDto);
      if (!memberData) {
        throw new BadRequestException('미등록정보', {
          cause: new Error(),
          description: '가입되지않은 정보입니다.',
        });
      }
      return memberData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
