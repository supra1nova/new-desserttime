import { Injectable } from '@nestjs/common';
import { PostAccusationDto } from './dto/post-accusation.dto';
import { AccusationDto } from './dto/accusation.dto';
import { AccusationRepository } from './accusation.repository';
import { AccusationEnum } from '../../common/enum/accusation.enum';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class AccusationService {
  constructor(private accusationRepository: AccusationRepository) {}

  /**
   * 신고 사유 목록 조회
   */
  @Transactional()
  async getAccusationList() {
    return Object.entries(AccusationEnum).map(([key, value]) => ({
      code: key,
      text: value,
    }));
  }

  /**
   * 신고 등록
   * @param postAccusationDto
   * @returns
   */
  @Transactional()
  async insertAccusation(postAccusationDto: PostAccusationDto) {
    await this.accusationRepository.insertAccusation(postAccusationDto);
  }

  /**
   * 사용자,리뷰가 동일한 신고기록있는지 확인
   * @param accusationRecordDto
   * @returns
   */
  @Transactional()
  async getAccusations(accusationRecordDto: AccusationDto) {
    let isAlreadyAccused = false;

    const accusations = await this.accusationRepository.findAccusations(accusationRecordDto);
    if (accusations) {
      isAlreadyAccused = true;
    }

    return { isAlreadyAccused: isAlreadyAccused };
  }
}
