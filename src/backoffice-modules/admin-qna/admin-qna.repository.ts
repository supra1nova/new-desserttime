import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from '../../config/entities/qna.entity';
import { Like, Repository } from 'typeorm';
import { SearchAdminQnaDto } from './model/search-admin-qna.dto';
import { SearchQnaEnum } from '../../common/enum/qna.enum';

export class AdminQnaRepository {
  constructor(@InjectRepository(Qna) private readonly adminQnaRepository: Repository<Qna>) {}

  /**
   * qna 수량 조회
   * @returns Promise<number>
   */
  async count(searchAdminQnaDto: SearchAdminQnaDto) {
    const whereClause = this.setWhereClause(searchAdminQnaDto);

    return await this.adminQnaRepository.count({
      where: whereClause,
    });
  }

  /**
   * 페이지네이션된 qna 리스트 조회
   * @param searchAdminQnaDto
   * @returns Promise<Member[]>
   */
  async findAll(searchAdminQnaDto: SearchAdminQnaDto) {
    const selectClause = {
      isAnswered: true,
      qnaId: true,
      email: true,
      content: true,
      createdDate: true,
      replyContent: true,
      replyCreatedDate: true,
      replyUpdateDate: true,
    };
    const whereClause = this.setWhereClause(searchAdminQnaDto);

    return await this.adminQnaRepository.find({
      select: selectClause,
      where: whereClause,
      skip: searchAdminQnaDto.getSkip(),
      take: searchAdminQnaDto.getTake(),
      order: {
        createdDate: 'DESC',
      },
    });
  }

  /**
   * qna 답변 생성
   * @param qnaId
   * @param qNAData
   * */
  async create(qnaId: string, qNAData: Partial<Qna>) {
    // await this.adminQnaRepository.update(qnaId, qNAData);
    await this.adminQnaRepository.update({ qnaId: qnaId }, { isAnswered: true, replyContent: qNAData.replyContent, replyAdminId: qNAData.replyAdminId, replyCreatedDate: new Date() });
  }

  /**
   * qna 단건 조회
   * @param qnaId
   * @returns Promise<Qna>
   */
  async findOneById(qnaId: string) {
    return await this.adminQnaRepository.createQueryBuilder('qna').select().where('qna.qnaId = :qnaId', { qnaId: true }).setParameter('qnaId', qnaId).orderBy('qna.createdDate', 'DESC').getOne();
  }

  /**
   * qna 답변 수정
   * @param qnaId
   * @param qNAData
   * */
  async update(qnaId: string, qNAData: Partial<Qna>) {
    await this.adminQnaRepository.update({ qnaId: qnaId }, { replyContent: qNAData.replyContent, replyAdminId: qNAData.replyAdminId, replyUpdateDate: new Date() });
  }

  /**
   * repository 내에서 사용할 where 절 구성
   * @param searchAdminQnaDto
   * @returns {string: T}
   */
  private setWhereClause(searchAdminQnaDto: SearchAdminQnaDto) {
    const whereClause = {};

    const isAnswered = SearchQnaEnum.IS_ANSWERED.valueOf();
    const email = SearchQnaEnum.EMAIL.valueOf();
    const content = SearchQnaEnum.CONTENT.valueOf();

    const searchEmail = searchAdminQnaDto.email;
    const searchContent = searchAdminQnaDto.content;

    whereClause[isAnswered] = searchAdminQnaDto.isAnswered;

    if (searchEmail) {
      whereClause[email] = Like(`%${searchEmail}%`);
    }

    if (searchContent) {
      whereClause[content] = Like(`%${searchContent}%`);
    }

    return whereClause;
  }
}
