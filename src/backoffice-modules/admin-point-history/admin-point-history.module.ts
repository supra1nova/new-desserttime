import { Module } from '@nestjs/common';
import { AdminPointHistoryService } from './admin-point-history.service';
import { AdminPointHistoryController } from './admin-point-history.controller';
import { AdminPointHistoryRepository } from './admin-point-history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointHistory } from '../../config/entities/point-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointHistory])],
  exports: [AdminPointHistoryService],
  controllers: [AdminPointHistoryController],
  providers: [AdminPointHistoryService, AdminPointHistoryRepository],
})
export class AdminPointHistoryModule {}
