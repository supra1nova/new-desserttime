import { InjectRepository } from '@nestjs/typeorm';
import { QnA } from '../../config/entities/qna.entity';
import { Like, Repository } from 'typeorm';
import { SearchAdminQnaDto } from './model/search-admin-qna.dto';
import { MemberEnum } from '../admin-member/model/member.enum';
import { SearchAdminMemberDto } from '../admin-member/model/search-admin-member.dto';
import { NoticeSearchEnum } from '../notice/model/notice.enum';
import { SearchQnaEnum } from './model/search-admin-qna.enum';

export class AdminQnaRepository {
  constructor(@InjectRepository(QnA) private readonly adminQnaRepository: Repository<QnA>) {}

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
