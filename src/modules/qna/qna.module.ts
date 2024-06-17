import { Module } from '@nestjs/common';
import { QnAController } from './qna.controller';
import { QnAService } from './qna.service';

@Module({
  controllers: [QnAController],
  providers: [QnAService]
})
export class QnAModule {}
