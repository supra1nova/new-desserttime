import { Module } from '@nestjs/common';
import { AdminQnaService } from './admin-qna.service';
import { AdminQnaController } from './admin-qna.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qna } from '../../config/entities/qna.entity';
import { AdminQnaRepository } from './admin-qna.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Qna])],
  exports: [],
  controllers: [AdminQnaController],
  providers: [AdminQnaService, AdminQnaRepository],
})
export class AdminQnaModule {}
