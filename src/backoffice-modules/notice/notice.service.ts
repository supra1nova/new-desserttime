import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './model/create-notice.dto';
import { SearchNoticeDto } from './model/search-notice.dto';
import { NoticeRepository } from './notice.repository';
import { Page } from '../common/dto/page.dto';
import { UpdateNoticeDto } from './model/update-notice.dto';
import { DeleteNoticeDto } from './model/delete-notice.dto';

@Injectable()
export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

  /**
   * 공지사항 리스트 조회
   * @param searchNoticeDto
   * @returns Promise<Page<Notice>>
   */
  async findAll(searchNoticeDto: SearchNoticeDto) {
    const total = await this.noticeRepository.count(searchNoticeDto);
    const items = await this.noticeRepository.findAll(searchNoticeDto);

    const pageNo = searchNoticeDto.pageNo;
    const limitSize = searchNoticeDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }

  /**
   * 공지사항 생성
   * @param createNoticeDto
   * @returns Promise<InsertResult>
   */
  async create(createNoticeDto: CreateNoticeDto) {
    return this.noticeRepository.insert(createNoticeDto);
  }

  /**
   * 공지사항 단건 조회
   * @param noticeId
   * @returns Promise<Notice>
   */
  async findOneById(noticeId: string) {
    return this.noticeRepository.findOneById(noticeId);
  }

  /**
   * 공지사항 수정
   * @param noticeId
   * @param updateNoticeDto
   * @returns Promise<boolean>
   */
  async update(noticeId: string, updateNoticeDto: UpdateNoticeDto) {
    return this.noticeRepository.update(noticeId, updateNoticeDto);
  }

  /**
   * 공지사항 삭제
   * @param noticeId
   * @returns Promise<boolean>
   */
  async delete(noticeId: string) {
    const deleteDto = new DeleteNoticeDto(noticeId, false);
    return this.noticeRepository.delete(deleteDto);
  }
}
