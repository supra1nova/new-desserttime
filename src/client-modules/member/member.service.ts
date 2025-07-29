import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SignInDto } from './dto/sign-in.dto';
import { MemberRepository } from './member.repository';
import { ValidateUserDto } from './dto/validate-user.dto';
import { NoticePaginationDto } from './dto/notice-pagination.dto';
import { NoticeDto } from './dto/notice.dto';
import { MemberUpdateDto } from './member.update.dto';
import { MemberPointDto } from './dto/member-point.dto';
import { MemberDeletion } from '../../common/enum/member.enum';
import { AuthService } from 'src/config/auth/auth.service';
import { CursorPaginationDto } from '../../common/pagination/dto/cursor.pagination.dto';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly authService: AuthService,
  ) {}

  /**
   * 회원가입
   * @param signInDto
   */
  @Transactional()
  async memberSignIn(signInDto: SignInDto) {
    const isEmail = await this.memberRepository.findMemberByEmail(signInDto.memberEmail);
    const isSnsId = await this.memberRepository.findMemberBySnsId(signInDto.snsId);

    if (isEmail || isSnsId) {
      throw new BadRequestException('중복정보', {
        cause: new Error(),
        description: '이미 등록된 사용자입니다.',
      });
    }

    const pickedDCList = [];

    const newMember = await this.memberRepository.insertMember(signInDto);
    if (!newMember) {
      throw new BadRequestException('등록실패', {
        cause: new Error(),
        description: '사용자 등록에 실패했습니다.',
      });
    }

    const insertedSeq = newMember.raw[0].SEQ; // Oracle은 대문자 컬럼명
    const memberId = newMember.raw[0].memberId;
    const nickname = `${insertedSeq}번째 달콤한 디저트`;

    const updateMemberResult = await this.memberRepository.updateMemberNickname(memberId, nickname);
    if (!updateMemberResult) {
      throw new BadRequestException('요청실패', {
        cause: new Error(),
        description: '회원 정보를 업데이트할 수 없습니다.',
      });
    }

    const categoriesArr = [signInDto.memberPickCategory1, signInDto.memberPickCategory2, signInDto.memberPickCategory3, signInDto.memberPickCategory4, signInDto.memberPickCategory5];
    const categories = categoriesArr.filter((category) => category !== undefined);
    categories.forEach((category) => {
      if (category) {
        pickedDCList.push({
          member: { memberId },
          dessertCategory: { dessertCategoryId: category },
        });
      }
    });

    if (categories.length > 0) {
      await this.memberRepository.insertPickCategoryList(pickedDCList);
    }
    return await this.memberRepository.findMemberById(memberId);
  }

  /**
   * 사용자 유효성검사
   * @param validateUserDto
   * @returns
   */
  @Transactional()
  async memberValidate(validateUserDto: ValidateUserDto) {
    const memberData = await this.memberRepository.findMemberBySnsIdAndIsUsable(validateUserDto);

    if (!memberData) {
      throw new BadRequestException('미등록정보', {
        cause: new Error(),
        description: '가입되지않은 정보입니다.',
      });
    }
    const token = await this.authService.jwtLogIn(memberData);
    return {
      id: memberData.memberId,
      email: memberData.memberEmail,
      name: memberData.memberName,
      token: token.token,
    };
  }

  /**
   * 마이페이지 첫화면 (리뷰 수, 밀 수, 닉네임)
   * @param memberId
   * @returns
   */
  @Transactional()
  async getMyPageInfo(memberId: string) {
    const member = await this.memberRepository.findMemberById(memberId);
    const usersReviewCount = await this.memberRepository.findReviewCount(memberId);
    const usersPoint = await this.memberRepository.findTotalPoints(memberId);
    const usersTotalPoint = usersPoint[0] ? usersPoint[0].totalPoint : 0;

    return {
      nickname: member.nickname,
      usersReviewCount,
      usersTotalPoint,
    };
  }

  /**
   * 사용자 정보 조회
   * @param memberId
   * @returns
   */
  @Transactional()
  async getMemberById(memberId: string) {
    const datas = await this.memberRepository.findMemberInfos(memberId);

    return datas.reduce((acc, current) => {
      if (acc['memberId'] == current.memberId) {
        acc.desserts.push({
          dessertCategoryId: current.dessertCategoryId,
          dessertName: current.dessertName,
        });
      } else {
        acc = {
          memberId: current.memberId,
          gender: current.gender,
          nickname: current.nickname,
          birthYear: current.birthYear,
          firstCity: current.firstCity,
          secondaryCity: current.secondaryCity,
          thirdCity: current.thirdCity,
          profileImgMiddlePath: current.profileImgMiddlePath,
          profileImgId: current.profileImgId,
          profileImgPath: current.profileImgPath,
          profileImgExtension: current.profileImgExtension,
          desserts: [
            {
              dessertCategoryId: current.dessertCategoryId,
              dessertName: current.dessertName,
            },
          ],
        };
      }

      return acc;
    }, {});
  }

  /**
   * 닉네임 사용여부 확인
   * @param nickname
   * @returns
   */
  @Transactional()
  async validateNickname(nickname: string) {
    const members = await this.memberRepository.findMemberByNickname(nickname);

    return members.length < 1;
  }

  /**
   * 사용자 정보 변경
   * @param memberUpdateDto
   */
  @Transactional()
  async updateMember(memberUpdateDto: MemberUpdateDto) {
    await this.memberRepository.saveMember(memberUpdateDto);

    const pickDessertList = [];
    const categories = [memberUpdateDto.memberPickCategory1, memberUpdateDto.memberPickCategory2, memberUpdateDto.memberPickCategory3, memberUpdateDto.memberPickCategory4, memberUpdateDto.memberPickCategory5].filter(
      (category) => category !== undefined,
    );
    categories.forEach((category) => {
      if (category) {
        pickDessertList.push({
          member: { memberId: memberUpdateDto.memberId },
          dc: { dessertCategoryId: category },
        });
      }
    });

    if (categories.length > 0) {
      await this.memberRepository.deletePickCategoryList(memberUpdateDto);
      await this.memberRepository.insertPickCategoryList(pickDessertList);
    }
  }

  /**
   * 광고, 알람 수신 여부 조회
   * @param memberId
   * @returns
   */
  @Transactional()
  async getAlarmAndAdStatus(memberId: string) {
    const { adStatus, alarmStatus } = await this.memberRepository.findMemberById(memberId);

    return {
      adStatus: adStatus,
      alarmStatus: alarmStatus,
    };
  }

  /**
   * 알람 수신여부 업데이트
   * @param memberId
   */
  @Transactional()
  async updateAlarmStatus(memberId: string) {
    const result = await this.memberRepository.updateAlarmStatus(memberId);

    if (result) {
      throw new BadRequestException('알림 수신여부 업데이트 실패', {
        cause: new Error(),
        description: '알림 수신여부 업데이트에 실패했습니다.',
      });
    }
  }

  /**
   * 광고 수신여부 업데이트
   * @param memberId
   */
  @Transactional()
  async updateAdStatus(memberId: string) {
    const result = await this.memberRepository.updateAd(memberId);

    if (result) {
      throw new BadRequestException('업데이트 실패', {
        cause: new Error(),
        description: '광고 수신 상태 업데이트에 실패했습니다.',
      });
    }
  }

  /**
   * 탈퇴 사유 조회
   * @returns
   */
  @Transactional()
  async getDeleteReason(): Promise<{ code: string; text: MemberDeletion }> {
    // todo: 탈퇴사유 공통코드로 db 저장 후 조회하도록 처리 필요
    return new Promise<any>(() => {
      return Object.entries(MemberDeletion).map(([key, value]) => ({
        code: key,
        text: value,
      }));
    });
  }

  /**
   * 사용자 탈퇴하기
   * @param memberId
   */
  @Transactional()
  async deleteMember(memberId: string) {
    const result = await this.memberRepository.deleteMember(memberId);

    if (result) {
      throw new BadRequestException('탈퇴 실패', {
        cause: new Error(),
        description: '탈퇴에 실패했습니다.',
      });
    }
  }

  /**
   * 이번달에 쌓은 포인트점수
   * @param memberId
   * @returns
   */
  @Transactional()
  async getPoint(memberId: string) {
    const thisMonthPointData = await this.memberRepository.findThisMonthPoint(memberId);
    const totalPointData = await this.memberRepository.findTotalPoints(memberId);

    const thisMonthPoint = !thisMonthPointData.totalPoint ? 0 : thisMonthPointData.totalPoint;
    const totalPoint = !totalPointData[0] ? 0 : !totalPointData[0].totalPoint ? 0 : totalPointData[0].totalPoint;

    return { thisMonthPoint, totalPoint };
  }

  /**
   * 보유밀 상세내역
   * @param memberPointDtoList
   */
  @Transactional()
  async getPointHistoryList(memberPointDtoList: MemberPointDto) {
    const pointHistoryList = await this.memberRepository.findPointHistoryList(memberPointDtoList);

    const result = pointHistoryList.items.map((data) => {
      const createDate: string = data.createDate.toISOString().substring(0, 10);
      return {
        pointHistoryId: data.pointHistoryId,
        menuName: data.review ? data.review.menuName : '관리자 소관',
        point: data.newPoint,
        createDate,
      };
    });

    return { items: result, hasNextPage: pointHistoryList.hasNextPage, nextCursor: pointHistoryList.nextCursor };
  }

  /**
   * 공지/이벤트 목록조회
   * @param noticeListDto
   * @returns
   */
  @Transactional()
  async getNoticeList(noticeListDto: NoticePaginationDto) {
    return await this.memberRepository.findNoticeList(noticeListDto);
  }

  /**
   * 공지/이벤트 하나 조회
   * @param noticeDto
   * @returns
   */
  @Transactional()
  async getNotice(noticeDto: NoticeDto) {
    return await this.memberRepository.findNotice(noticeDto);
  }

  /**
   * 사용자가 등록한 리뷰목록 조회하기
   * @param memberId
   * @param cursorPaginationDto
   */
  @Transactional()
  async getReviewList(memberId: string, cursorPaginationDto: CursorPaginationDto) {
    return await this.memberRepository.findReviewList(memberId, cursorPaginationDto);
  }
}
