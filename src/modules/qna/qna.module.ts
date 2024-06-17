import { Module } from '@nestjs/common';
import { QnAController } from './qna.controller';
import { QnAService } from './qna.service';
import { QnARepository } from './qna.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QnA } from 'src/config/entities/qna.entity';

@Module({    
  imports: [
  TypeOrmModule.forFeature([
    QnA
  ]),
],
  controllers: [QnAController],
  providers: [QnAService,QnARepository]
})
export class QnAModule {}
