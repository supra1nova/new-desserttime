import { Injectable } from '@nestjs/common';
import { AdminQnaRepository } from './admin-qna.repository';
import { SearchAdminQnaDto } from './model/search-admin-qna.dto';
import { Page } from '../common/dto/page.dto';
import { ReplyAdminQnaDto } from './model/reply-admin-qna.dto';
import { Qna } from '../../config/entities/qna.entity';
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
   * @param qNAId
   * @param replyAdminQnaDto
   * @return Promise<boolean>
   * */
  @Transactional()
  async processCreateUpdateReply(qNAId: string, replyAdminQnaDto: ReplyAdminQnaDto) {
    const qnaData: Partial<Qna> = {};
    qnaData['replyContent'] = replyAdminQnaDto.replyContent;
    qnaData['replyAdminId'] = replyAdminQnaDto.replyAdminId;

    const qnA = await this.findOneById(qNAId);

    if (qnA.isAnswered) {
      return await this.adminQnaRepository.update(qNAId, replyAdminQnaDto);
    }
    return await this.adminQnaRepository.create(qNAId, replyAdminQnaDto);
  }

  /**
   * qna 단건 조회
   * @param qNAId
   * @returns Promise<Qna>
   */
  async findOneById(qNAId: string) {
    const result = await this.adminQnaRepository.findOneById(qNAId);

    if (result === null) throw new Error('일치하는 QnA 글이 존재하지 않습니다.');
    return result;
  }
}
