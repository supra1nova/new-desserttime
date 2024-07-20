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
    async findMemberOne(snsId:string,memberEmail:string) {
      console.log(" ::::snsId :::: ",snsId," :::memberEmail ::::", memberEmail)
        return await this.memberRepository.findOne({
          select: {
            memberId: true,
            memberEmail: true,
          },
          where: { snsId ,memberEmail:memberEmail},
        });
      }

  /**
   * 로그인
   * @param loginDto
   * @returns
   */
  async memberLogin(loginDto:LoginDto) {
    console.log(loginDto);
    return await this.memberRepository.findOne({
       where: { snsId : loginDto.snsId ,memberEmail:loginDto.memberEmail},
    });
  }

  /**
   * 회원가입
   * @param email
   * @returns
   */
  async insertMember(signInDto: SignInDto){
    console.log('signInDto ::::::',signInDto);
    return await this.memberRepository.insert({
        snsId:signInDto.snsId,
        memberName:signInDto.memberName,
        memberEmail:signInDto.memberEmail,
        signInSns:signInDto.signInSns,
        birthYear:signInDto.birthYear,
        gender:signInDto.memberGender,
        firstCity:signInDto.firstCity,
        secondaryCity:signInDto.secondaryCity,
        thirdCity:signInDto.thirdCity,
        isAgreeAD:signInDto.isAgreeAD
    });
  }

}