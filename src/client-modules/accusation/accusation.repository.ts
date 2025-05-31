import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accusation } from 'src/config/entities/accusation.entity';
import { Repository } from 'typeorm';
import { PostAccusationDto } from './dto/post-accusation.dto';
import { AccusationDto } from './dto/accusation.dto';

@Injectable()
export class AccusationRepository {
  constructor(@InjectRepository(Accusation) private accustion: Repository<Accusation>) {}

  /**
   * 신고 등록
   * @param postAccusationDto
   * @returns
   */
  async insertAccusation(postAccusationDto: PostAccusationDto) {
    return await this.accustion.insert({
      reason: postAccusationDto.reason,
      content: postAccusationDto.content,
      member: { memberId: postAccusationDto.memberId },
      review: { reviewId: postAccusationDto.reviewId },
    });
  }

  /**
   * 사용자,리뷰가 동일한 신고기록있는지 확인
   * @param accusationRecordDto
   * @returns
   */
  async findAccusations(accusationRecordDto: AccusationDto) {
    return await this.accustion.findOne({
      where: {
        member: { memberId: accusationRecordDto.memberId },
        review: { reviewId: accusationRecordDto.reviewId },
      },
      select: { accusationId: true },
    });
  }
}
