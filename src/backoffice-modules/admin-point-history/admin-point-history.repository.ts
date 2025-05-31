import { InjectRepository } from '@nestjs/typeorm';
import { PointHistory } from '../../config/entities/point-history.entity';
import { Repository } from 'typeorm';
import { SearchAdminPointHistoryDto } from './model/search-admin-point-history.dto';

export class AdminPointHistoryRepository {
  constructor(@InjectRepository(PointHistory) private adminPointHistoryRepository: Repository<PointHistory>) {}

  /**
   * 신규 포인트 기록 삽입
   * @param pointHistory
   * @return Promise<insertResult>
   * */
  async insert(pointHistory: Partial<PointHistory>) {
    const insertResult = await this.adminPointHistoryRepository.insert(pointHistory);
    return insertResult.identifiers.length > 0;
  }

  /**
   * 특정 회원 PointHistory 내역 수량 조회
   * @returns Promise<number>
   */
  async count(memberId: string) {
    return await this.adminPointHistoryRepository.count({
      where: {
        member: {
          memberId: memberId,
        },
      },
    });
  }

  /**
   * 특정 회원 신규 포인트 기록 전체 조회
   * @param memberId
   * @param searchAdminPointHistoryDto
   * @return Promise<insertResult>
   * */
  async findAllByMemberId(memberId: string, searchAdminPointHistoryDto: SearchAdminPointHistoryDto) {
    return this.adminPointHistoryRepository.find({
      select: {
        pointHistoryId: true,
        newPoint: true,
        pointType: true,
        createDate: true,
        review: {
          reviewId: true,
          menuName: true,
        },
      },
      relations: ['review'],
      where: {
        member: { memberId: memberId },
      },
      skip: searchAdminPointHistoryDto.getSkip(),
      take: searchAdminPointHistoryDto.getTake(),
      order: {
        createDate: 'DESC',
      },
    });
  }
}
