import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/config/entities/member.entity';
import { LessThan, Repository } from 'typeorm';
import { ValidateUserDto } from './dto/validate-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Review } from 'src/config/entities/review.entity';
import { Point } from 'src/config/entities/point.entity';
import { PointHistory } from 'src/config/entities/point-history.entity';
import { Notice } from 'src/config/entities/notice.entity';
import { NoticePaginationDto } from './dto/notice-pagination.dto';
import { NoticeDto } from './dto/notice.dto';
import { ProfileImg } from 'src/config/entities/profile-img.entity';
import { UserInterestDessert } from 'src/config/entities/user-interest-dessert.entity';
import { DessertCategory } from 'src/config/entities/dessert-category.entity';
import { MemberUpdateDto } from './member.update.dto';
import { ResponseCursorPagination } from 'src/common/pagination/response.cursor.pagination';
import { MemberPointDto } from './dto/member-point.dto';
import { NoticeType } from 'src/common/enum/noticetype.enum';
import { CursorPaginationDto } from '../../common/pagination/dto/cursor.pagination.dto';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
    @InjectRepository(PointHistory)
    private pointHistory: Repository<PointHistory>,
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
    @InjectRepository(UserInterestDessert)
    private userInterestDessertRepository: Repository<UserInterestDessert>,
  ) {}

  /**
   * 멤버 조회 by id
   * @param memberId
   * @returns
   */
  async findMemberById(memberId: string) {
    return await this.memberRepository.findOne({ where: { memberId } });
  }

  /**
   * 멤버 조회 by email
   * @param memberEmail
   * @returns
   */
  async findMemberByEmail(memberEmail: string) {
    return await this.memberRepository.findOne({ where: { memberEmail } });
  }

  /**
   * 멤버 조회 by sns id
   * @param snsId
   * @returns
   */
  async findMemberBySnsId(snsId: string) {
    return await this.memberRepository.findOne({ where: { snsId } });
  }

  /**
   * 멤버 조회 by sns id, isUsable true
   * @param validateUserDto
   * @returns
   */
  async findMemberBySnsIdAndIsUsable(validateUserDto: ValidateUserDto) {
    const snsId = validateUserDto.snsId;

    return await this.memberRepository.findOne({ where: { snsId } });
  }

  /**
   * 멤버 저장
   * @param signInDto
   * @returns
   */
  async insertMember(signInDto: SignInDto) {
    return await this.memberRepository
      .createQueryBuilder()
      .insert()
      .into(Member)
      .values({
        snsId: signInDto.snsId,
        memberName: signInDto.memberName,
        memberEmail: signInDto.memberEmail,
        signInSns: signInDto.signInSns,
        birthYear: signInDto.birthYear,
        gender: signInDto.memberGender,
        firstCity: signInDto.firstCity,
        secondaryCity: signInDto.secondaryCity,
        thirdCity: signInDto.thirdCity,
        adStatus: signInDto.isAgreeAD,
      })
      .returning(['seq'])
      .execute();
  }

  /**
   * 닉네임 등록
   * @param memberId
   * @param nickname
   */
  async updateMemberNickname(memberId: string, nickname: string) {
    const result = await this.memberRepository.update({ memberId: memberId }, { nickname: nickname });
    return !!result.affected;
  }

  /**
   * 사용자정보 조회 - 이미지, 취향 join
   * @param memberId
   * @returns
   */
  async findMemberInfos(memberId: string) {
    return await this.memberRepository
      .createQueryBuilder('m')
      .leftJoin(ProfileImg, 'profileImg', 'profileImg.memberMemberId = m.memberId') // 프로필 이미지와의 JOIN
      .leftJoin(UserInterestDessert, 'uids', 'uids.memberMemberId = m.memberId') // user_interest_dessert와의 JOIN
      .leftJoin(DessertCategory, 'dc', 'dc.dessertCategoryId = uids.dcDessertCategoryId') // dessert_category와의 JOIN
      .select([
        'm.memberId AS "memberId"',
        'm.gender AS "gender"',
        'm.nickname AS "nickname"',
        'm.birthYear AS "birthYear"',
        'm.firstCity AS "firstCity"',
        'm.secondaryCity AS "secondaryCity"',
        'm.thirdCity AS "thirdCity"',
        'profileImg.middlePath AS "profileImgMiddlePath"',
        'profileImg.profileImgId AS "profileImgId"',
        'profileImg.path AS "profileImgPath"',
        'profileImg.extension AS "profileImgExtension"',
        'dc.dessertCategoryId AS "dessertCategoryId"',
        'dc.dessertName AS "dessertName"',
      ])
      .where({ memberId }) // 특정 회원 ID 조건
      .getRawMany();
  }

  /**
   * 닉네임 존재여부 확인
   * @param nickname
   */
  async findMemberByNickname(nickname: string) {
    return await this.memberRepository.find({ where: { nickname } });
  }

  /**
   * 사용자가 작성한 리뷰 카운트
   * @param memberId
   * @returns
   */
  async findReviewCount(memberId: string) {
    return await this.reviewRepository.count({ where: { member: { memberId: memberId } } });
  }

  /**
   * 보유 밀
   * @param memberId
   * @returns
   */
  async findTotalPoints(memberId: string) {
    return await this.pointRepository.find({ select: { totalPoint: true }, where: { member: { memberId } } });
  }

  /**
   * 알람 수신여부 변경
   * @param memberId
   */
  async updateAlarmStatus(memberId: string) {
    const subQuery = this.memberRepository.createQueryBuilder('subMember').select('subMember.alarm_status').where('subMember.id = :fromId', { memberId }).getQuery();

    const result = await this.memberRepository
      .createQueryBuilder()
      .update(Member)
      .set({
        alarmStatus: () => `(${subQuery})`,
      })
      .where('id = :toId', { memberId })
      .execute();

    return !!result.affected;
  }

  /**
   * 광고 수신여부 변경
   * @param memberId
   */
  async updateAd(memberId: string) {
    // todo: isAgreeAd
    const result = await this.memberRepository.update({ memberId }, { adStatus: false });
    return !!result.affected;
  }

  /**
   * 사용자 탈퇴
   * @param memberId
   */
  async deleteMember(memberId: string) {
    const result = await this.memberRepository.softDelete({ memberId });
    return !!result.affected;
  }

  /**
   * 이번달 포인트 조회
   * @param memberId
   * @returns
   */
  async findThisMonthPoint(memberId: string) {
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // 이번 달의 첫 날
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // 이번 달의 마지막 날

    return await this.pointHistory
      .createQueryBuilder('ph')
      .select('SUM(ph.newPoint)', 'totalPoint')
      .leftJoin(Member, 'm', 'ph.memberMemberId = m.memberId')
      .where({ memberId })
      .andWhere('ph.createDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getRawOne();
  }

  /**
   * 보유밀 상세내역
   * @param memberPointDtoList
   * @returns
   */
  async findPointHistoryList(memberPointDtoList: MemberPointDto) {
    const { memberId, cursor, limit } = memberPointDtoList;

    const items = await this.pointHistory
      .createQueryBuilder('pointHistory')
      .leftJoinAndSelect('pointHistory.review', 'review')
      .select(['pointHistory.pointHistoryId', 'pointHistory.createDate', 'pointHistory.newPoint', 'review.menuName'])
      .where('pointHistory.memberMemberId = :memberId', { memberId })
      .andWhere(cursor ? 'pointHistory.pointHistoryId < :cursor' : '1 = 1', { cursor: Number(cursor) })
      .orderBy('pointHistory.createDate', 'DESC')
      .take(limit + 1)
      .getMany();
    return new ResponseCursorPagination(items, limit, 'pointHistoryId');
  }

  /**
   * 공지/이벤트 목록 조회
   * @param noticeListDto
   * @returns
   */
  async findNoticeList(noticeListDto: NoticePaginationDto) {
    const { cursor, limit } = noticeListDto;
    const selectFields: any = { title: true, createDate: true, noticeId: true };
    if (noticeListDto.noticeType == NoticeType.FAQ) selectFields.content = true;
    const items = await this.noticeRepository.find({
      select: selectFields,
      // where: { noticeType: noticeListDto.noticeType, ...(cursor ? { noticeId: LessThan(Number(cursor)) } : {}) },
      /*where: {
        noticeType: noticeListDto.noticeType,
        // ...(cursor ? { noticeId: LessThan(Number(cursor)) } : {})
      },*/
      order: { createDate: 'DESC' },
      take: limit + 1, // limit보다 하나 더 많이 조회해 다음 페이지 유무를 확인
    });

    return new ResponseCursorPagination(items, limit, 'noticeId');
  }

  /**
   * 공지/이벤트 하나 조회
   * @param noticeDto
   * @returns
   */
  async findNotice(noticeDto: NoticeDto) {
    const { noticeId, noticeType } = noticeDto;
    return await this.noticeRepository.findOne({ where: { noticeId, noticeType } });
  }

  /**
   * 사용자 정보 수정하기
   * @param memberUpdateDto
   * @returns
   */
  async saveMember(memberUpdateDto: MemberUpdateDto) {
    return await this.memberRepository.update(
      { memberId: memberUpdateDto.memberId },
      {
        birthYear: memberUpdateDto.birthYear,
        gender: memberUpdateDto.gender,
        firstCity: memberUpdateDto.firstCity,
        secondaryCity: memberUpdateDto.secondaryCity,
        thirdCity: memberUpdateDto.thirdCity,
        nickname: memberUpdateDto.nickname,
      },
    );
  }

  /**
   * 기존에 사용자가 선택한 디저트 카테고리 삭제
   * @param memberUpdateDto
   * @returns
   */
  async deletePickCategoryList(memberUpdateDto: MemberUpdateDto) {
    return await this.userInterestDessertRepository.createQueryBuilder().delete().where('memberMemberId = :memberId', { memberId: memberUpdateDto.memberId }).execute();
  }

  /**
   * 사용자가 선택한 디저트카테고리 저장
   * @param pickDessertList
   * @returns
   */
  async insertPickCategoryList(pickDessertList: any) {
    return await this.userInterestDessertRepository.save(pickDessertList);
  }

  /**
   * 내 리뷰 리스트 조회
   * @param memberId
   * @param cursorPaginationDto
   * @returns
   */
  async findReviewList(memberId: string, cursorPaginationDto: CursorPaginationDto) {
    const { limit, cursor } = cursorPaginationDto;
    const items = await this.reviewRepository.find({
      where: { member: { memberId }, ...(cursor ? { pointHistoryId: LessThan(Number(cursor)) } : {}) },
      relations: ['reviewImg'],
      order: { createDate: 'DESC' },
      take: limit + 1,
    });

    return new ResponseCursorPagination(items, limit, 'pointHistoryId');
  }
}
