import { Module } from '@nestjs/common';
import { AdminReviewImgService } from './admin-review-img.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewImg } from '../../config/entities/review-img.entity';
import { AdminReviewImgRepository } from './admin-review-img.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewImg])],
  exports: [AdminReviewImgService],
  controllers: [],
  providers: [AdminReviewImgService, AdminReviewImgRepository],
})
export class AdminReviewImgModule {}
