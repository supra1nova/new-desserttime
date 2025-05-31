import { Injectable } from '@nestjs/common';
import { QnaRepository } from './qna.repository';
import { CreateQnaDto } from './dto/create-qna.dto';
import { FindQnaDto } from './dto/find-qna.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class QnaService {
  constructor(private qnaRepository: QnaRepository) {}

  @Transactional()
  async postQna(createQnaDto: CreateQnaDto) {
    await this.qnaRepository.insertQna(createQnaDto);
  }

  @Transactional()
  async getQna(qnaDto: FindQnaDto) {
    return await this.qnaRepository.findQna(qnaDto);
  }
}
