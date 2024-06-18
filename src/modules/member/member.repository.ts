import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/config/entities/member.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class MemberRepository {

  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  /**
   * 로그인
   * @param loginDto
   * @returns
   */
    async selectMember(memberId:string,memberEmail:string) {
        return await this.memberRepository.findOne({
          select: {
            memberId: true,
            email: true,
          },
          where: { email:memberEmail}, //memberid
        });
      }

  /**
   * 로그인
   * @param loginDto
   * @returns
   */
  async memberLogin(loginDto:LoginDto) {
    return await this.memberRepository.findOne({
      select: {
        memberId: true,
        email: true,
      },
      where: { email:loginDto.memberEmail}, //memberId : loginDto.memberId ,
    });
  }

  /**
   * 회원가입
   * @param email
   * @returns
   */
  async insertMember(signInDto: SignInDto){
    return await this.memberRepository.insert({
        memberName:signInDto.memberName,
        email:signInDto.memberEmail,
        domain:signInDto.memberDomain,
        birth:signInDto.memberBirth,
        gender:signInDto.memberGender,
        address:signInDto.memberAddress,
        isAgreeAD:signInDto.isAgreeAD
    }); //        memberId:signInDto.memberId,

  }

}