import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { MemberRepository } from './member.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class MemberService {
constructor(private memberRepository:MemberRepository){}
 async memberSignIn(signInDto:SignInDto){
    try {
        const isMember = await this.memberRepository.selectMember(signInDto.memberId, signInDto.memberEmail);
        console.log('isMember ::::::::::::::::::::::::::',isMember);
if(!isMember){
        await this.memberRepository.insertMember(signInDto);
}else{
    throw new BadRequestException('중복정보', {
        cause: new Error(),
        description: '사용중인 이메일입니다.',
      });
}
return {
    resultStatus :true,

}
    } catch (error) {
     console.log(error);   
     throw error;
    }
 }   

 async memberLogIn(loginDto:LoginDto){
    try {
        const memberData = await this.memberRepository.memberLogin(loginDto);
if(!memberData){
    throw new BadRequestException('미등록정보', {
        cause: new Error(),
        description: '가입되지않은 정보입니다.',
      });
    }
    console.log("isMember ::::::::::::::::: ",memberData);
    return {    resultStatus :true,
        data : memberData
    }
    } catch (error) {
        console.log(error);
        throw error;
    }
    
 }
}
