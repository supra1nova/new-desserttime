import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchNoticeDto } from './dto/search-notice.dto';
import { NoticeRepository } from './notice.repository';
import { Page } from '../common/dto/page.dto';

@Injectable()
export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

  async findAll(searchNoticeDto: SearchNoticeDto) {
    const total = await this.noticeRepository.count(searchNoticeDto);
    const items = await this.noticeRepository.findAll(searchNoticeDto);

    const pageNo = searchNoticeDto.pageNo;
    const limitSize = searchNoticeDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }

  create(createNoticeDto: CreateNoticeDto) {
    return this.noticeRepository.insertNotice(createNoticeDto);
  }

  /*findOne(id: number) {
    return `This action returns a #${id} notice`;
  }

  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    return `This action updates a #${id} notice`;
  }

  remove(id: number) {
    return `This action removes a #${id} notice`;
  }*/
}
