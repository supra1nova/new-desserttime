import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { Review } from 'src/config/entities/review.entity';
import { Like } from 'src/config/entities/like.entity';
import { Member } from 'src/config/entities/member.entity';
import { ReviewIngredient } from 'src/config/entities/review-ingredient.entity';
import { ReviewImg } from 'src/config/entities/review-img.entity';
import { Ingredient } from 'src/config/entities/ingredient.entity';
import { AdminPointModule } from 'src/backoffice-modules/admin-point/admin-point.module';

@Module({
  imports: [AdminPointModule, TypeOrmModule.forFeature([Review, Like, Member, Ingredient, ReviewIngredient, ReviewImg])],
  exports: [],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
