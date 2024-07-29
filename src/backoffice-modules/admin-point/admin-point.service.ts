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

  async processUpdatePoint(memberId: number, updateAdminPointDto: UpdateAdminPointDto) {
    // PointHistory 적재
    await this.adminPointHistoryService.insert(memberId, updateAdminPointDto);

    // Point 조회
    const point = await this.adminPointRepository.findOneByMemberId(memberId);
    const totalPoint = point.totalPoint + updateAdminPointDto.newPoint;

    // Point 수정
    return await this.adminPointRepository.update(memberId, totalPoint);
  }
}
