import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';
import { Member } from 'src/config/entities/member.entity';
import { Review } from 'src/config/entities/review.entity';
import { Point } from 'src/config/entities/point.entity';
import { PointHistory } from 'src/config/entities/point.history.entity';
import { Notice } from 'src/config/entities/notice.entity';
import { UserInterestDessert } from 'src/config/entities/user.interest.dessert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Review, Point, PointHistory, Notice, UserInterestDessert])],
  exports: [],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
