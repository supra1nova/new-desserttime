import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/config/entities/member.entity';
import { Repository } from 'typeorm';
import { UserValidationDto } from './dto/login.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  /**
   * 회원가입시 사용자 검사
   * @param loginDto
   * @returns
   */
  async findEmailOne(memberEmail: string) {
    return await this.memberRepository.findOne({
      select: {
        memberId: true,
        memberEmail: true,
      },
      where: { memberEmail },
    });
  }

  /**
   * 회원가입시 사용자 검사
   * @param loginDto
   * @returns
   */
  async findSnsIdOne(snsId: string) {
    return await this.memberRepository.findOne({
      select: {
        memberId: true,
        memberEmail: true,
      },
      where: { snsId },
    });
  }

  /**
   * 사용자 로그인시도시 유효성 검사
   * @param loginDto
   * @returns
   */
  async memberValidate(userValidationDto: UserValidationDto) {
    return await this.memberRepository.findOne({
      where: { snsId: userValidationDto.snsId },
    });
  }

  /**
   * 회원가입
   * @param email
   * @returns
   */
  async insertMember(signInDto: SignInDto) {
    return await this.memberRepository.insert({
      snsId: signInDto.snsId,
      memberName: signInDto.memberName,
      memberEmail: signInDto.memberEmail,
      signInSns: signInDto.signInSns,
      birthYear: signInDto.birthYear,
      gender: signInDto.memberGender,
      firstCity: signInDto.firstCity,
      secondaryCity: signInDto.secondaryCity,
      thirdCity: signInDto.thirdCity,
      isAgreeAD: signInDto.isAgreeAD,
      nickName: Math.ceil(Math.random() * 1000) + ' 번째 테스트 닉네임 어흥',
    });
  }
}
