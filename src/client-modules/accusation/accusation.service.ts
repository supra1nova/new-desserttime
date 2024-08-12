import { Injectable } from '@nestjs/common';
import { PostAccusationDto } from './dto/post.accusation.dto';
import { AccusationRecordDto } from './dto/accusation.record.dto';
import { AccusationRepository } from './accusation.repository';
import { AccusationEnum } from './enum/accusation.enum';

@Injectable()
export class AccusationService {
  constructor(private accusationRepository: AccusationRepository) {}

  /**
   * 신고 사유 목록 조회
   */
  async getAccuList() {
    return AccusationEnum;
  }

  /**
   * 신고 등록
   * @param postAccusationDto
   * @returns
   */
  async postAccusation(postAccusationDto: PostAccusationDto) {
    await this.accusationRepository.insertAccusation(postAccusationDto);
  }

  /**
   * 사용자,리뷰가 동일한 신고기록있는지 확인
   * @param accusationRecordDto
   * @returns
   */
  async getPreAccuRecord(accusationRecordDto: AccusationRecordDto) {
    let isPreAccuRecord = false;

    const preAccusation = await this.accusationRepository.findPreAccuRecord(accusationRecordDto);
    if (preAccusation) isPreAccuRecord = true;
    return { isPreAccuRecord };
  }
}
