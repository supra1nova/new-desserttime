import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QnA } from 'src/config/entities/qna.entity';
import { Repository } from 'typeorm';
import { CreateQnADto } from './dto/create.qna.dto';
import { QnAIdDto } from './dto/qna.id.dto';

@Injectable()
export class QnARepository {
  constructor(
    @InjectRepository(QnA)
    private qnaRepository: Repository<QnA>,
  ) {}
  async insertQnA(createQnADto: CreateQnADto) {
    await this.qnaRepository.insert(createQnADto);
  }

  async findQnAList() {
    return await this.qnaRepository.find({ select: { qnaId: true, content: true, email: true, createdDate: true }, where: { isUsable: true } });
  }

  async findQnA(qnAIdDto: QnAIdDto) {
    return await this.qnaRepository.findOne({ select: { qnaId: true, content: true, email: true, createdDate: true }, where: { isUsable: true, qnaId: qnAIdDto.qId } });
  }
}
