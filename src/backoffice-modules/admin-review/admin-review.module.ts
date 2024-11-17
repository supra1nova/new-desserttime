import { Module } from '@nestjs/common';
import { AdminReviewService } from './admin-review.service';
import { AdminReviewController } from './admin-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../config/entities/review.entity';
import { AdminReviewRepository } from './admin-review.repository';
import { AdminReviewIngredientModule } from '../admin-review-ingredient/admin-review-ingredient.module';
import { AdminReviewImgModule } from '../admin-review-img/admin-review-img.module';
import { AdminPointModule } from '../admin-point/admin-point.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), AdminReviewImgModule, AdminReviewIngredientModule, AdminPointModule],
  exports: [],
  controllers: [AdminReviewController],
  providers: [AdminReviewService, AdminReviewRepository],
})
export class AdminReviewModule {}
