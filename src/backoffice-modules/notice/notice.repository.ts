import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '../../config/entities/notice.entity';
import { Like, Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchNoticeDto } from './dto/search-notice.dto';
import { NoticeSearchEnum } from '../common/enum/notice.enum';

@Injectable()
export class NoticeRepository {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  /**
   * 공지사항 게시물 수량 조회
   * @returns Promise<number>
   */
  async count(searchNoticeDto: SearchNoticeDto) {
    const whereClause = this.setWhereClause(searchNoticeDto);

    return await this.noticeRepository.count({
      where: whereClause,
    });
  }

  /**
   * 페이지네이션된 공지사항 조회
   * @param searchNoticeDto SearchNoticeDto instance
   * @returns Promise<Notice[]>
   */
  async findAll(searchNoticeDto: SearchNoticeDto) {
    const whereClause = this.setWhereClause(searchNoticeDto);

    return await this.noticeRepository.find({
      where: whereClause,
      skip: searchNoticeDto.getSkip(),
      take: searchNoticeDto.getTake(),
      order: {
        createdDate: 'DESC',
      },
    });
  }

  /**
   * 공지사항 등록
   * @param createNoticeDto CreateNoticeDto instance
   * @returns Promise<InsertResult>
   */
  async insertNotice(createNoticeDto: CreateNoticeDto) {
    return await this.noticeRepository.insert({
      title: createNoticeDto.title,
      content: createNoticeDto.content,
    });
  }

  /**
   * repository 내에서 사용할 where 절 구성
   * @param searchNoticeDto SearchNoticeDto instance
   * @returns {string: T}
   */
  private setWhereClause(searchNoticeDto: SearchNoticeDto) {
    const searchType = searchNoticeDto.searchType;
    const searchValue = searchNoticeDto.searchValue;

    const whereClause = {};
    const all = NoticeSearchEnum.ALL.valueOf();
    const title = NoticeSearchEnum.TITLE.valueOf();
    const content = NoticeSearchEnum.CONTENT.valueOf();

    if (searchValue === undefined || searchValue === null) {
      return {};
    }

    if (searchType === undefined || searchType === all) {
      whereClause[title] = Like(`%${searchNoticeDto.searchValue}%`);
      whereClause[content] = Like(`%${searchNoticeDto.searchValue}%`);
    }

    if (searchType === title) {
      whereClause[title] = Like(`%${searchNoticeDto.searchValue}%`);
    }

    if (searchType === content) {
      whereClause[content] = Like(`%${searchNoticeDto.searchValue}%`);
    }

    return whereClause;
  }
}
