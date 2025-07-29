import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { QnaRepository } from './qna.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qna } from 'src/config/entities/qna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qna])],
  controllers: [QnaController],
  providers: [QnaService, QnaRepository],
})
export class QnAModule {}
