import { Module } from '@nestjs/common';
import { AdminReviewService } from './admin-review.service';
import { AdminReviewController } from './admin-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../config/entities/review.entity';
import { AdminReviewRepository } from './admin-review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  exports: [],
  controllers: [AdminReviewController],
  providers: [AdminReviewService, AdminReviewRepository],
})
export class AdminReviewModule {}
