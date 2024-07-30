import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accusation } from 'src/config/entities/accusation.entity';
import { Repository } from 'typeorm';
import { PostAccusationDto } from './dto/post.accusation.dto';
import { AccusationRecordDto } from './dto/accusation.record.dto';

@Injectable()
export class AccusationRepository {
  constructor(
    @InjectRepository(Accusation) private accustion: Repository<Accusation>,
  ) {}

  /**
   * 신고 등록
   * @param postAccusationDto
   * @returns
   */
  async insertAccusation(postAccusationDto: PostAccusationDto) {
    return await this.accustion.insert({
      reason: postAccusationDto.reason,
      member: { memberId: postAccusationDto.memberId },
      review: { reviewId: postAccusationDto.revieiwId },
    });
  }

  /**
   * 사용자,리뷰가 동일한 신고기록있는지 확인
   * @param accusationRecordDto
   * @returns
   */
  async findPreAccuRecord(accusationRecordDto: AccusationRecordDto) {
    return await this.accustion.findOne({
      where: {
        member: { memberId: accusationRecordDto.memberId },
        review: { reviewId: accusationRecordDto.revieiwId },
      },
      select: { accusationId: true },
    });
  }
}
