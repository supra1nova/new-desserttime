import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { AdminLoginDto } from './model/admin-login.dto';

@Controller('login')
export class AdminLoginController {
  constructor(private readonly loginService: AdminLoginService) {}

  @Post()
  login(@Body() loginDto: AdminLoginDto) {
    return this.loginService.processLogin(loginDto);
  }
}
