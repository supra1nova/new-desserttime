import { Injectable } from '@nestjs/common';
import { AdminReviewRepository } from './admin-review.repository';
import { Transactional } from 'typeorm-transactional';
import { AdminSearchReviewDto } from './dto/admin-search-review.dto';

@Injectable()
export class AdminReviewService {
  constructor(private adminReviewRepository: AdminReviewRepository) {}

  @Transactional()
  async findAll(adminSearchReviewDto: AdminSearchReviewDto) {
    return this.adminReviewRepository.findReviewList(adminSearchReviewDto);
  }

  /*
  create(createAdminReviewDto: CreateAdminReviewDto) {
    return 'This action adds a new adminReview';
  }

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
