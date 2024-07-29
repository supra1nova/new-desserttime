import { Inject, Injectable } from '@nestjs/common';
import { AdminPointHistoryRepository } from './admin-point-history.repository';
import { UpdateAdminPointDto } from '../admin-point/model/update-admin-point.dto';
import { Page } from '../common/dto/page.dto';
import { SearchAdminPointHistoryDto } from './model/search-admin-point-history.dto';

@Injectable()
export class AdminPointHistoryService {
  constructor(@Inject() private adminPointHistoryRepository: AdminPointHistoryRepository) {}

  /**
   * 신규 PointHistory 삽입
   * @param memberId
   * @param updateAdminPointDto
   * @return Promise<boolean>
   * */
  async insert(memberId: number, updateAdminPointDto: UpdateAdminPointDto) {
    const member = {};
    member['memberId'] = memberId;

    const pointHistory = {};
    pointHistory['member'] = member;
    pointHistory['newPoint'] = updateAdminPointDto.newPoint;
    pointHistory['pointType'] = updateAdminPointDto.pointType;

    return await this.adminPointHistoryRepository.insert(pointHistory);
  }

  /**
   * 특정 회원 포인트 내역 전체 조회
   * @param memberId
   * @param searchAdminPointHistoryDto
   * @return Promise<insertResult>
   * */
  async processFindAllByMemberId(memberId: number, searchAdminPointHistoryDto: SearchAdminPointHistoryDto) {
    if (searchAdminPointHistoryDto.getTake() < 20) {
      searchAdminPointHistoryDto.limitSize = 20;
    }

    const total = await this.adminPointHistoryRepository.count(memberId);
    const items = await this.adminPointHistoryRepository.findAllByMemberId(memberId, searchAdminPointHistoryDto);

    const pageNo = searchAdminPointHistoryDto.pageNo;
    const limitSize = searchAdminPointHistoryDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }
}
