import { Injectable } from '@nestjs/common';
import { PostAccusationDto } from './dto/post.accusation.dto';
import { AccusationRecordDto } from './dto/accusation.record.dto';
import { AccusationRepository } from './accusation.repository';

@Injectable()
export class AccusationService {
  constructor(private accusationRepository: AccusationRepository) {}
  /**
   * 신고 등록
   * @param postAccusationDto
   * @returns
   */
  async postAccusation(postAccusationDto: PostAccusationDto) {}

  /**
   * 사용자,리뷰가 동일한 신고기록있는지 확인
   * @param accusationRecordDto
   * @returns
   */
  async getPreAccuRecord(accusationRecordDto: AccusationRecordDto) {}
}
