import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '../../config/entities/notice.entity';
import { Like, Repository } from 'typeorm';
import { CreateNoticeDto } from './model/create-notice.dto';
import { SearchNoticeDto } from './model/search-notice.dto';
import { NoticeSearchEnum } from './model/notice-search.enum';
import { UpdateNoticeDto } from './model/update-notice.dto';
import { DeleteNoticeDto } from './model/delete-notice.dto';

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
      where: { ...whereClause, isUsable: true },
    });
  }

  /**
   * 페이지네이션된 공지사항 조회
   * @param searchNoticeDto
   * @returns Promise<Notice[]>
   */
  async findAll(searchNoticeDto: SearchNoticeDto) {
    const whereClause = this.setWhereClause(searchNoticeDto);

    return await this.noticeRepository.find({
      where: { ...whereClause },
      skip: searchNoticeDto.getSkip(),
      take: searchNoticeDto.getTake(),
      order: {
        createdDate: 'DESC',
      },
    });
  }

  /**
   * 공지사항 등록
   * @param createNoticeDto
   * @returns Promise<InsertResult>
   */
  async insert(createNoticeDto: CreateNoticeDto) {
    return await this.noticeRepository.insert({
      title: createNoticeDto.title,
      content: createNoticeDto.content,
    });
  }

  /**
   * 공지사항 조회
   * @param noticeId
   * @returns Promise<Notice>
   */
  async findOneById(noticeId: number) {
    return await this.noticeRepository.findOneBy({
      noticeId: noticeId,
      isUsable: true,
    });
  }

  /**
   * 공지사항 수정
   * @param updateNoticeDto
   * @returns Promise<boolean>
   */
  async update(noticeIdFromParam: number, updateNoticeDto: UpdateNoticeDto) {
    const { ...elements } = updateNoticeDto;
    const updateResult = await this.noticeRepository.update(
      { noticeId: noticeIdFromParam },
      { ...elements },
    );
    return !!updateResult.affected;
  }

  /**
   * 공지사항 삭제
   * @param deleteDto
   * @returns Promise<boolean>
   */
  async delete(deleteDto: DeleteNoticeDto) {
    const { noticeId, ...elements } = deleteDto;
    const updateResult = await this.noticeRepository.update(
      { noticeId: noticeId },
      { ...elements },
    );
    return !!updateResult.affected;
  }

  /**
   * repository 내에서 사용할 where 절 구성
   * @param searchNoticeDto
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
