import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from '../../config/entities/point.entity';

export class AdminPointRepository {
  constructor(@InjectRepository(Point) private adminPointRepository: Repository<Point>) {}

  async findOneByMemberId(memberId: number) {
    return await this.adminPointRepository.findOneBy({ member: { memberId: memberId } });
  }

  async update(memberId: number, totalPoint: number) {
    await this.adminPointRepository.update({ member: { memberId: memberId } }, { totalPoint: totalPoint });
  }
}
