import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchNoticeDto } from './dto/search-notice.dto';
import { NoticeRepository } from './notice.repository';
import { Page } from '../common/dto/page.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { DeleteDto } from './dto/delete-notice.dto';

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

  async create(createNoticeDto: CreateNoticeDto) {
    return this.noticeRepository.insert(createNoticeDto);
  }

  async findOneById(noticeId: number) {
    return this.noticeRepository.findOneById(noticeId);
  }

  async update(noticeId: number, updateNoticeDto: UpdateNoticeDto) {
    return this.noticeRepository.update(noticeId, updateNoticeDto);
  }

  async delete(noticeId: number) {
    const deleteDto = new DeleteDto(noticeId, true);
    return this.noticeRepository.delete(deleteDto);
  }

  /*

  remove(id: number) {
    return `This action removes a #${id} notice`;
  }*/
}
