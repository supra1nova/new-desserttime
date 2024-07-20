import { Module } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { AdminLoginController } from './admin-login.controller';

@Module({
  exports: [],
  controllers: [AdminLoginController],
  providers: [AdminLoginService],
})
export class AdminLoginModule {}
