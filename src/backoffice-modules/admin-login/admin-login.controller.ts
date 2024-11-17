import { Controller, Post, Body } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { AdminLoginDto } from './model/admin-login.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('login')
export class AdminLoginController {
  constructor(private readonly loginService: AdminLoginService) {}

  @ApiOperation({ summary: '관리 화면 로그인' })
  @ApiBody({
    type: AdminLoginDto,
    description: `
      email: 관리자 회원 이메일
      password: 비밀번호
  `,
  })
  @Post()
  async login(@Body() loginDto: AdminLoginDto) {
    return this.loginService.processLogin(loginDto);
  }
}
