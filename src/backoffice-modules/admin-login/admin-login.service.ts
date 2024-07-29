import { Injectable } from '@nestjs/common';
import { AdminLoginDto } from './model/admin-login.dto';

@Injectable()
export class AdminLoginService {
  processLogin(loginDto: AdminLoginDto) {
    // TODO: client 쪽 토큰 이용 login 로직 완성시 관리화면 로그인 후 토큰 발행하는 로직 구현 필요,  - 현재는 들어온 아이디/패스워드 반환중
    return loginDto;
  }
}
