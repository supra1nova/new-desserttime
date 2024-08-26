import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from '../../config/entities/notice.entity';
import { NoticeRepository } from './notice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  exports: [],
  controllers: [NoticeController],
  providers: [NoticeService, NoticeRepository],
})
export class NoticeModule {}
