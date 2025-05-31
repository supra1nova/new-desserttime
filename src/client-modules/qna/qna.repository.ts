import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from 'src/config/entities/qna.entity';
import { Repository } from 'typeorm';
import { CreateQnaDto } from './dto/create-qna.dto';
import { FindQnaDto } from './dto/find-qna.dto';

@Injectable()
export class QnaRepository {
  constructor(
    @InjectRepository(Qna)
    private qnaRepository: Repository<Qna>,
  ) {}

  async insertQna(createQnaDto: CreateQnaDto) {
    await this.qnaRepository.insert(createQnaDto);
  }

  async findQna(qnaDto: FindQnaDto) {
    return await this.qnaRepository.findOne({ where: qnaDto });
  }
}
