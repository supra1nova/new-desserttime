import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdminPointDto } from './model/update-admin-point.dto';
import { AdminPointRepository } from './admin-point.repository';
import { AdminPointHistoryService } from '../admin-point-history/admin-point-history.service';

@Injectable()
export class AdminPointService {
  constructor(
    @Inject() private adminPointRepository: AdminPointRepository,
    @Inject() private adminPointHistoryService: AdminPointHistoryService,
  ) {}

  /**
   * 포인트 업데이트 프로세스
   * @param memberId
   * @param updateAdminPointDto
   * */
  async processUpdatePoint(memberId: number, updateAdminPointDto: UpdateAdminPointDto) {
    // PointHistory 에 신규 포인트 내역 적재
    await this.adminPointHistoryService.insert(memberId, updateAdminPointDto);

    // point 객체 내 totalPoint 조회 및 신규 포인트 합산
    const point = await this.adminPointRepository.findOneByMemberId(memberId);
    const totalPoint = point.totalPoint + updateAdminPointDto.newPoint;

    // 합산된 totalPoint 로 point 수정
    return await this.adminPointRepository.update(memberId, totalPoint);
  }
}
