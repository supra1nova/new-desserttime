import { Module } from '@nestjs/common';
import { AdminPointService } from './admin-point.service';
import { AdminPointController } from './admin-point.controller';
import { AdminPointRepository } from './admin-point.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from '../../config/entities/point.entity';
import { AdminPointHistoryModule } from '../admin-point-history/admin-point-history.module';

@Module({
  imports: [TypeOrmModule.forFeature([Point]), AdminPointHistoryModule],
  exports: [AdminPointService],
  controllers: [AdminPointController],
  providers: [AdminPointService, AdminPointRepository],
})
export class AdminPointModule {}
