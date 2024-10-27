import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Member } from '../../config/entities/member.entity';
import { SearchAdminMemberDto } from './model/search-admin-member.dto';
import { MemberSearchType } from '../common/enum/member.enum';
import { DeleteAdminMemberDto } from './model/delete-admin-member.dto';

export class AdminMemberRepository {
  constructor(@InjectRepository(Member) private adminMemberRepository: Repository<Member>) {}

  /**
   * 회원 수량 조회
   * @returns Promise<number>
   */
  async count(searchAdminMemberDto: SearchAdminMemberDto) {
    const whereClause = this.setWhereClause(searchAdminMemberDto);

    return await this.adminMemberRepository.count({
      where: whereClause,
    });
  }

  /**
   * 페이지네이션된 회원 리스트 조회
   * @param searchAdminMemberDto
   * @returns Promise<Member[]>
   */
  async findAll(searchAdminMemberDto: SearchAdminMemberDto) {
    const selectClause = {
      memberId: true,
      isUsable: true,
      nickName: true,
      snsId: true,
      signInSns: true,
      memberEmail: true,
      memberName: true,
      lastAccessDate: true,
      createdDate: true,
    };
    const whereClause = this.setWhereClause(searchAdminMemberDto);

    return await this.adminMemberRepository.find({
      select: selectClause,
      where: whereClause,
      skip: searchAdminMemberDto.getSkip(),
      take: searchAdminMemberDto.getTake(),
      order: {
        createdDate: 'DESC',
      },
    });
  }

  /**
   * 회원 단건 조회
   * @param memberId
   * @returns Promise<Member>
   */
  async findOneById(memberId: number) {
    return await this.adminMemberRepository
      .createQueryBuilder('member')
      .select([
        'member.snsId',
        'member.signInSns',
        'member.memberEmail',
        'member.memberName',
        'member.nickName',
        'member.birthYear',
        'member.gender',
        'member.isHavingImg',
        'member.isUsable',
        'member.createdDate',
        'member.updateDate',
        'member.lastAccessDate',
        'member.memo',
        'member.type',
        'member.isAgreeAD',
        'member.isAgreeAlarm',
        'member.firstCity',
        'member.secondaryCity',
        'member.thirdCity',
        'member.isAgreeAD',
        'point.totalPoint',
        'userInterestDessert.UIDid',
        'dessertCategory.dessertCategoryId',
        'dessertCategory.dessertName',
        'dessertCategory.sessionNum',
        'profileImg.profileImgId',
        'profileImg.middlePath',
        'profileImg.path',
        'profileImg.imgName',
      ])
      .leftJoin('member.point', 'point')
      .leftJoin('member.uids', 'userInterestDessert')
      .leftJoin('userInterestDessert.dc', 'dessertCategory', 'dessertCategory.isUsable = 1')
      .leftJoin('member.profileImg', 'profileImg', 'profileImg.isUsable = 1')
      .where('member.memberId = :memberId', { memberId: true })
      .setParameter('memberId', memberId)
      .orderBy('member.createdDate', 'DESC')
      .orderBy('userInterestDessert.UIDid', 'ASC')
      .getOne();
  }

  /**
   * 회원 정보 수정
   * @param memberId
   * @param partialMember
   * @returns Promise<boolean>
   */
  async update(memberId: number, partialMember: Partial<Member>) {
    const updateResult = await this.adminMemberRepository.update(memberId, partialMember);
    return !!updateResult.affected;
  }

  /**
   * 회원 삭제
   * @param deleteAdminMemberDto
   * @returns Promise<boolean>
   */
  async delete(deleteAdminMemberDto: DeleteAdminMemberDto) {
    const { memberId, ...elements } = deleteAdminMemberDto;
    const updateResult = await this.adminMemberRepository.update({ memberId: memberId }, { ...elements });
    return !!updateResult.affected;
  }

  /**
   * repository 내에서 사용할 where 절 구성
   * @param searchAdminMemberDto
   * @returns {string: T}
   */
  private setWhereClause(searchAdminMemberDto: SearchAdminMemberDto) {
    const searchType = searchAdminMemberDto.searchType;
    const searchValue = searchAdminMemberDto.searchValue;

    const whereClause = {};

    if (searchAdminMemberDto.isUsable !== undefined) {
      whereClause['isUsable'] = searchAdminMemberDto.isUsable;
    }

    const memberEmail = MemberSearchType.MEMBER_EMAIL;
    const nickname = MemberSearchType.NICKNAME;

    if (searchValue === undefined || searchValue === null) {
      return whereClause;
    }

    if (searchType === undefined) {
      const whereClause2 = JSON.parse(JSON.stringify(whereClause));

      whereClause[memberEmail] = Like(`%${searchAdminMemberDto.searchValue}%`);
      whereClause2[nickname] = Like(`%${searchAdminMemberDto.searchValue}%`);

      return [whereClause, whereClause2];
    }

    if (searchType === memberEmail) {
      whereClause[memberEmail] = Like(`%${searchAdminMemberDto.searchValue}%`);
      return whereClause;
    }

    if (searchType === nickname) {
      whereClause[nickname] = Like(`%${searchAdminMemberDto.searchValue}%`);
      return whereClause;
    }

    return whereClause;
  }
}
