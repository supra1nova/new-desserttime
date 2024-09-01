import { Injectable } from '@nestjs/common';
import { AdminQnaRepository } from './admin-qna.repository';
import { SearchAdminQnaDto } from './model/search-admin-qna.dto';
import { Page } from '../common/dto/page.dto';

@Injectable()
export class AdminQnaService {
  constructor(private adminQnaRepository: AdminQnaRepository) {}

  async findAll(searchAdminQnaDto: SearchAdminQnaDto) {
    const total = await this.adminQnaRepository.count(searchAdminQnaDto);
    const items = await this.adminQnaRepository.findAll(searchAdminQnaDto);

    const pageNo = searchAdminQnaDto.pageNo;
    const limitSize = searchAdminQnaDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }

  /*create(createAdminQnaDto: CreateAdminQnaDto) {
    return 'This action adds a new adminQna';
  }

  findOne(id: number) {
    return `This action returns a #${id} adminQna`;
  }

  update(id: number, updateAdminQnaDto: UpdateAdminQnaDto) {
    return `This action updates a #${id} adminQna`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminQna`;
  }*/
}
