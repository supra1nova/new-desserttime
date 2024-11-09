import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { MemberRepository } from './member.repository';
import { Transactional } from 'typeorm-transactional';
import { UserValidationDto } from './dto/login.dto';
import { MemberIdDto } from './dto/member.id';
import { MemberDeleteDto } from './dto/member.delete.dto';
import { MemberAlarmDto } from './dto/member.alarm.dto';
import { MemberAdDto } from './dto/member.add.dto';
import { NoticeListDto } from './dto/notice.list.dto';
import { NoticeDto } from './dto/notice.dto';
import { NickNameDto } from './dto/nickname.dto';
import { MemberUpdateDto } from './member.update.dto';
import { v4 as uuid } from 'uuid';
import { MemberPointListDto } from './dto/member.pointlist.dto';
import { MemberDeletion } from '../../common/enum/member.enum';
import { MemberIdPagingDto } from './dto/member.id.paging.dto';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  /**
   * 회원가입
   * @param signInDto
   */
  @Transactional()
  async memberSignIn(signInDto: SignInDto) {
    try {
      const isEmail = await this.memberRepository.findEmailOne(signInDto.memberEmail);
      const isSnsId = await this.memberRepository.findSnsIdOne(signInDto.snsId);

      if (!isEmail && !isSnsId) {
        const pickedDCList = [];

        const newMember = await this.memberRepository.insertMember(signInDto);
        const newMemberId = newMember.identifiers[0].memberId;
        const nickName = `${newMemberId}번째 달콤한 디저트`;

        await this.memberRepository.updateMemberNickname(newMemberId, nickName);

        const categories = [signInDto.memberPickCategory1, signInDto.memberPickCategory2, signInDto.memberPickCategory3, signInDto.memberPickCategory4, signInDto.memberPickCategory5];
        categories.forEach((category) => {
          if (category) {
            pickedDCList.push({
              member: { memberId: newMemberId },
              dc: { dessertCategoryId: category },
            });
          }
        });
        await this.memberRepository.insertPickCategoryList(pickedDCList);
      } else {
        throw new BadRequestException('중복정보', {
          cause: new Error(),
          description: '이미 등록된 사용자입니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 사용자 유효성검사
   * @param userValidationDto
   * @returns
   */
  @Transactional()
  async memberValidate(userValidationDto: UserValidationDto) {
    try {
      const memberData = await this.memberRepository.memberValidate(userValidationDto);
      if (!memberData) {
        throw new BadRequestException('미등록정보', {
          cause: new Error(),
          description: '가입되지않은 정보입니다.',
        });
      }
      return memberData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 마이페이지 첫화면 (리뷰 수, 밀 수, 닉네임)
   * @param memberIdDto
   * @returns
   */
  @Transactional()
  async myPageOverview(memberIdDto: MemberIdDto) {
    try {
      const nickName = await this.memberRepository.findUserNickNameOne(memberIdDto);
      const usersReviewCount = await this.memberRepository.countReview(memberIdDto);
      const usersTotalPoint = await this.memberRepository.findTotalPointOne(memberIdDto);
      return {
        nickName: nickName.nickName,
        usersReviewCount,
        usersTotalPoint: usersTotalPoint[0].totalPoint,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 사용자 정보 조회
   * @param memberIdDto
   * @returns
   */
  @Transactional()
  async getMemberOne(memberIdDto: MemberIdDto) {
    try {
      const memberData = await this.memberRepository.findMemberOne(memberIdDto);

      const result = memberData.reduce((acc, current) => {
        if (acc['memberId'] == current.memberId) {
          acc.desserts.push({
            dessertCategoryId: current.dessertCategoryId,
            dessertName: current.dessertName,
          });
        } else {
          acc = {
            memberId: current.memberId,
            gender: current.gender,
            nickName: current.nickName,
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 닉네임 사용여부 확인
   * @param nickNameDto
   * @returns
   */
  @Transactional()
  async isUsableNickName(nickNameDto: NickNameDto) {
    try {
      const result = { usable: true };
      const isUsableNickName = await this.memberRepository.isUsableNickName(nickNameDto);
      if (isUsableNickName.length > 0) result.usable = false;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 사용자 정보 변경
   * @param memberUpdateDto
   */
  @Transactional()
  async patchMember(memberUpdateDto: MemberUpdateDto) {
    try {
      await this.memberRepository.saveMember(memberUpdateDto);

      const pickDessertList = [];
      const categories = [memberUpdateDto.memberPickCategory1, memberUpdateDto.memberPickCategory2, memberUpdateDto.memberPickCategory3, memberUpdateDto.memberPickCategory4, memberUpdateDto.memberPickCategory5];

      categories.forEach((category) => {
        if (category) {
          pickDessertList.push({
            member: { memberId: memberUpdateDto.memberId },
            dc: { dessertCategoryId: category },
          });
        }
      });

      await this.memberRepository.deletePickCategoryList(memberUpdateDto);
      await this.memberRepository.insertPickCategoryList(pickDessertList);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 광고, 알람 수신 여부 조회
   * @param memberIdDto
   * @returns
   */
  @Transactional()
  async getAlarmAndADStatue(memberIdDto: MemberIdDto) {
    try {
      const { isAgreeAD, isAgreeAlarm } = await this.memberRepository.findAlarmAndADStatue(memberIdDto);
      return {
        isAgreeAD,
        isAgreeAlarm,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 알람 수신여부 업데이트
   * @param memberAlarmDto
   */
  @Transactional()
  async patchAlarmStatus(memberAlarmDto: MemberAlarmDto) {
    try {
      await this.memberRepository.updateAlarm(memberAlarmDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 광고 수신여부 업데이트
   * @param memberAdDto
   */
  @Transactional()
  async patchAdStatus(memberAdDto: MemberAdDto) {
    try {
      await this.memberRepository.updateAd(memberAdDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 탈퇴 사유 조회
   * @returns
   */
  @Transactional()
  async getReasonForLeaving() {
    try {
      return MemberDeletion;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 사용자 탈퇴하기
   * @param memberDeleteDto
   */
  @Transactional()
  async deleteMember(memberDeleteDto: MemberDeleteDto) {
    try {
      const member = await this.memberRepository.findMemberEntityOne(memberDeleteDto);
      if (!member.isUsable) {
        throw new BadRequestException('이미 삭제됨', {
          cause: new Error(),
          description: '이미 삭제된 사용자입니다.',
        });
      }
      const deletionMember = await this.memberRepository.insertDeletionMember(memberDeleteDto);
      const userData = {
        snsId: uuid(),
        memberId: memberDeleteDto.memberId,
        memberName: `${member.memberName.substring(0, 1)}**`,
        memberEmail: `${memberDeleteDto.memberId}@desserttime.com`,
        nickName: `${deletionMember.identifiers[0].memberDeletionId}번째탈퇴한디타인`,
      };
      await this.memberRepository.deleteMember(userData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 이번달에 쌓은 포인트점수
   * @param memberIdDto
   * @returns
   */
  @Transactional()
  async getPoint(memberIdDto: MemberIdDto) {
    try {
      const thisMonthPointData = await this.memberRepository.findThisMonthPoint(memberIdDto);
      const totalPointData = await this.memberRepository.findTotalPointOne(memberIdDto);
      const thisMonthPoint = !thisMonthPointData.totalPoint ? 0 : thisMonthPointData.totalPoint;
      const totalPoint = !totalPointData[0] ? 0 : !totalPointData[0].totalPoint ? 0 : totalPointData[0].totalPoint;
      const result = {
        thisMonthPoint,
        totalPoint,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 보유밀 상세내역
   * @param memberIdDto
   */
  @Transactional()
  async getPointHisoryList(memberPointListDto: MemberPointListDto) {
    try {
      const pointHistoryList = await this.memberRepository.findPointHisoryList(memberPointListDto);

      const result = pointHistoryList.items.map((data) => {
        const createdDate: string = data.createdDate.toISOString().substring(0, 10);
        return {
          pointHistoryId: data.pointHistoryId,
          menuName: data.review?.menuName,
          point: data.newPoint,
          createdDate,
        };
      });

      return { items: result, hasNextPage: pointHistoryList.hasNextPage, nextCursor: pointHistoryList.nextCursor };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 공지/이벤트 목록조회
   * @param noticeListDto
   * @returns
   */
  @Transactional()
  async getNoticeList(noticeListDto: NoticeListDto) {
    try {
      const result = await this.memberRepository.findNoticeList(noticeListDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 공지/이벤트 하나 조회
   * @param noticeDto
   * @returns
   */
  @Transactional()
  async getNoticeOne(noticeDto: NoticeDto) {
    try {
      const result = await this.memberRepository.findNoticeOne(noticeDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 사용자가 등록한 리뷰목록 조회하기
   * @param memberIdDto
   */
  @Transactional()
  async getMyReviewList(memberIdPagingDto: MemberIdPagingDto) {
    try {
      const reviewList = await this.memberRepository.findMyReviewList(memberIdPagingDto);
      return reviewList;
    } catch (error) {
      throw error;
    }
  }
}
