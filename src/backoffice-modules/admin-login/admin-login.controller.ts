import { Controller, Post, Body } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { AdminLoginDto } from './model/admin-login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('login')
export class AdminLoginController {
  constructor(private readonly loginService: AdminLoginService) {}

  @ApiOperation({ summary: '관리 화면 로그인' })
  @Post()
  login(@Body() loginDto: AdminLoginDto) {
    return this.loginService.processLogin(loginDto);
  }
}
