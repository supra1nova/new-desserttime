import { Injectable } from '@nestjs/common';
import { AdminQnaRepository } from './admin-qna.repository';
import { SearchAdminQnaDto } from './model/search-admin-qna.dto';
import { Page } from '../common/dto/page.dto';
import { ReplyAdminQnaDto } from './model/reply-admin-qna.dto';
import { QnA } from '../../config/entities/qna.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AdminQnaService {
  constructor(private adminQnaRepository: AdminQnaRepository) {}

  /**
   * qna 전체 조회
   * @param searchAdminQnaDto
   * @return Promise<Page<?>>
   * */
  async findAll(searchAdminQnaDto: SearchAdminQnaDto) {
    const total = await this.adminQnaRepository.count(searchAdminQnaDto);
    const items = await this.adminQnaRepository.findAll(searchAdminQnaDto);

    const pageNo = searchAdminQnaDto.pageNo;
    const limitSize = searchAdminQnaDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }

  /**
   * qna 답글 삽입/수정
   * @param qnaId
   * @param replyAdminQnaDto
   * @return Promise<boolean>
   * */
  @Transactional()
  async processCreateUpdateReply(qnaId: number, replyAdminQnaDto: ReplyAdminQnaDto) {
    const qnaData: Partial<QnA> = {};
    qnaData['replyContent'] = replyAdminQnaDto.replyContent;
    qnaData['replyAdminId'] = replyAdminQnaDto.replyAdminId;

    const qnA = await this.findOneById(qnaId);

    if (qnA.isAnswered) {
      return await this.adminQnaRepository.update(qnaId, replyAdminQnaDto);
    }
    return await this.adminQnaRepository.create(qnaId, replyAdminQnaDto);
  }

  /**
   * qna 단건 조회
   * @param qnaId
   * @returns Promise<QnA>
   */
  async findOneById(qnaId: number) {
    const result = await this.adminQnaRepository.findOneById(qnaId);

    if (result === null) throw new Error('일치하는 QnA 글이 존재하지 않습니다.');
    return result;
  }
}
