import { Injectable } from '@nestjs/common';
import { PostAccusationDto } from './dto/post.accusation.dto';
import { AccusationRecordDto } from './dto/accusation.record.dto';
import { AccusationRepository } from './accusation.repository';
import { AccusationEnum } from '../../common/enum/accusation.enum';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AccusationService {
  constructor(private accusationRepository: AccusationRepository) {}

  /**
   * 신고 사유 목록 조회
   */
  @Transactional()
  async getAccuList() {
    const result = Object.entries(AccusationEnum).map(([key, value]) => ({
      code: key,
      text: value,
    }));
    return result;
  }

  /**
   * 신고 등록
   * @param postAccusationDto
   * @returns
   */
  @Transactional()
  async postAccusation(postAccusationDto: PostAccusationDto) {
    await this.accusationRepository.insertAccusation(postAccusationDto);
  }

  /**
   * 사용자,리뷰가 동일한 신고기록있는지 확인
   * @param accusationRecordDto
   * @returns
   */
  @Transactional()
  async getPreAccuRecord(accusationRecordDto: AccusationRecordDto) {
    let isPreAccuRecord = false;

    const preAccusation = await this.accusationRepository.findPreAccuRecord(accusationRecordDto);
    if (preAccusation) isPreAccuRecord = true;
    return { isPreAccuRecord };
  }
}
