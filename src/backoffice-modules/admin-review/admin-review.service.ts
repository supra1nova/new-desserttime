import { Injectable } from '@nestjs/common';
import { AdminReviewRepository } from './admin-review.repository';
import { Transactional } from 'typeorm-transactional';
import { AdminSearchReviewDto } from './dto/admin-search-review.dto';
import { Page } from '../common/dto/page.dto';

@Injectable()
export class AdminReviewService {
  constructor(private adminReviewRepository: AdminReviewRepository) {}

  @Transactional()
  async findAll(adminSearchReviewDto: AdminSearchReviewDto) {
    const total = await this.adminReviewRepository.count(adminSearchReviewDto);
    const items = await this.adminReviewRepository.findReviewList(adminSearchReviewDto);

    const pageNo = adminSearchReviewDto.pageNo;
    const limitSize = adminSearchReviewDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }

  /*
  findOne(id: number) {
    return `This action returns a #${id} adminReview`;
  }

  update(id: number, updateAdminReviewDto: UpdateAdminReviewDto) {
    return `This action updates a #${id} adminReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminReview`;
  }*/
}
