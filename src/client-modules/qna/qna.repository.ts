import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from 'src/config/entities/qna.entity';
import { Repository } from 'typeorm';
import { CreateQnaDto } from './dto/create-qna.dto';
import { QnaDto } from './dto/qna.dto';

@Injectable()
export class QnaRepository {
  constructor(
    @InjectRepository(Qna)
    private qnaRepository: Repository<Qna>,
  ) {}

  async insertQna(createQnaDto: CreateQnaDto) {
    await this.qnaRepository.insert(createQnaDto);
  }

  async findQNA(qnaDto: QnaDto) {
    return await this.qnaRepository.findOne({ select: { qnaId: true, content: true, email: true, createdDate: true }, where: { isUsable: true, qnaId: qnaDto.qnaId } });
  }
}
