import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminReviewIngredientService } from './admin-review-ingredient.service';
import { AdminReviewIngredientRepository } from './admin-review-ingredient.repository';
import { ReviewIngredient } from '../../config/entities/review.ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewIngredient])],
  exports: [AdminReviewIngredientService],
  controllers: [],
  providers: [AdminReviewIngredientService, AdminReviewIngredientRepository],
})
export class AdminReviewIngredientModule {}
