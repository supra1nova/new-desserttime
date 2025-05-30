import { Injectable } from '@nestjs/common';
import { QnaRepository } from './qna.repository';
import { CreateQnaDto } from './dto/create-qna.dto';
import { QnaDto } from './dto/qna.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class QnaService {
  constructor(private qnaRepository: QnaRepository) {}

  @Transactional()
  async postQna(createQnaDto: CreateQnaDto) {
    try {
      await this.qnaRepository.insertQna(createQnaDto);
    } catch (error) {
      throw error;
    }
  }

  @Transactional()
  async getQna(qnaDto: QnaDto) {
    try {
      return await this.qnaRepository.findQNA(qnaDto);
    } catch (error) {
      throw error;
    }
  }
}
