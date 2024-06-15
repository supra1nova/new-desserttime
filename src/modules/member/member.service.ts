import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
constructor(memberRepository:MemberRepository){}
 async memberSignIn(signInDto:SignInDto){
    try {
        
    } catch (error) {
        
    }
 }   
}
