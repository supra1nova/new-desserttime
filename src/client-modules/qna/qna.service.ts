import { Injectable } from '@nestjs/common';
import { QnARepository } from './qna.repository';
import { CreateQnADto } from './dto/create.qna.dto';
import { QnAIdDto } from './dto/qna.id.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class QnAService {
  constructor(private qnaRepository: QnARepository) {}
  @Transactional()
  async postQnA(createQnADto: CreateQnADto) {
    try {
      await this.qnaRepository.insertQnA(createQnADto);
    } catch (error) {
      throw error;
    }
  }
  @Transactional()
  async getQnA(qnAIdDto: QnAIdDto) {
    try {
      const oneQna = await this.qnaRepository.findQnA(qnAIdDto);
      return oneQna;
    } catch (error) {
      throw error;
    }
  }
}
