import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { Review } from 'src/config/entities/review.entity';
import { Like } from 'src/config/entities/like.entity';
import { Member } from 'src/config/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Like, Member])],
  exports: [],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
