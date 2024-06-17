import { Module } from '@nestjs/common';
import { QnAController } from './qna.controller';
import { QnAService } from './qna.service';
import { QnARepository } from './qna.repository';

@Module({
  controllers: [QnAController],
  providers: [QnAService,QnARepository]
})
export class QnAModule {}
