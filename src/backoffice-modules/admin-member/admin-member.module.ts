import { Module } from '@nestjs/common';
import { AdminMemberService } from './admin-member.service';
import { AdminMemberController } from './admin-member.controller';
import { AdminMemberRepository } from './admin-member.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../config/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  exports: [],
  controllers: [AdminMemberController],
  providers: [AdminMemberService, AdminMemberRepository],
})
export class AdminMemberModule {}
