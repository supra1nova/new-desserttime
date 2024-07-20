import { Injectable } from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminLoginService {
  processLogin(loginDto: AdminLoginDto) {
    return loginDto;
  }
}
