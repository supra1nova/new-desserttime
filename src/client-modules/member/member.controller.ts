import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { MemberService } from './member.service';
import { ValidateUserDto } from './dto/validate-user.dto';
import { NoticePaginationDto } from './dto/notice-pagination.dto';
import { NoticeDto } from './dto/notice.dto';
import { MemberUpdateDto } from './member.update.dto';
import { MemberPointDto } from './dto/member-point.dto';
import { MemberPaginationDto } from './dto/member-pagination.dto';
import { MemberDeletion } from '../../common/enum/member.enum';
import { JwtAuthGuard } from '../../config/auth/jwt/jwt.guard';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.memberService.memberSignIn(signInDto);
  }

  @ApiOperation({ summary: '사용자 유효성 검사' })
  @Get('validation/:snsId')
  async validateMember(@Param() validateUserDto: ValidateUserDto) {
    return await this.memberService.memberValidate(validateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 첫 화면 사용자 정보 요약' })
  @Get('/my-page/:memberId')
  async getMyPageInfo(@Param() memberId: string) {
    return await this.memberService.getMyPageInfo(memberId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 사용자 정보 조회' })
  @Get('/my-page/member/:memberId')
  async getMemberById(@Query() memberId: string) {
    return await this.memberService.getMemberById(memberId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 닉네임 중복체크 //false: 사용불가' })
  @Post('/my-page/nickname')
  async validateNickname(@Body() nickname: string) {
    return await this.memberService.validateNickname(nickname);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 사용자 정보 수정하기 // id를 제외한 요청데이터들은 optional이라 입력안해도됨!' })
  @Patch('/my-page')
  async updateMember(@Query() memberUpdateDto: MemberUpdateDto) {
    return await this.memberService.updateMember(memberUpdateDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 설정 - 광 고,알람 수신여부 조회' })
  @Get('/my-page/config')
  async getAlarmAndAdStatus(@Query() memberId: string) {
    return await this.memberService.getAlarmAndAdStatus(memberId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '알림수신여부 변경' })
  @Patch('/my-page/alarm')
  async updateAlarmStatus(@Query() memberId: string) {
    return await this.memberService.updateAlarmStatus(memberId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '광고수신여부 변경' })
  @Patch('my-page/ad')
  async updateAdStatus(@Query() memberId: string) {
    return await this.memberService.updateAdStatus(memberId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '탈퇴사유 항목 조회(라디오버튼)' })
  @Get('my-page/delete-reason')
  async getDeleteReason(): Promise<{ code: string; text: MemberDeletion }> {
    return await this.memberService.getDeleteReason();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴하기' })
  @Delete('my-page/:memberId')
  async deleteMember(@Query() memberId: string) {
    await this.memberService.deleteMember(memberId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '총 적립포인트/이번달 적립포인트' })
  @Get('my-page/point/:memberId')
  async getPoint(@Query() memberId: string) {
    return await this.memberService.getPoint(memberId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '보유밀 상세내역' })
  @Get('my-page/point/list/:memberId')
  async getPointHistoryList(@Query() memberPointListDto: MemberPointDto) {
    return await this.memberService.getPointHistoryList(memberPointListDto);
  }

  @ApiOperation({ summary: '공지/이벤트/자주묻는질문 목록 조회' })
  @Get('my-page/notice/list/:noticeType')
  async getNoticeList(@Query() noticeListDto: NoticePaginationDto) {
    return await this.memberService.getNoticeList(noticeListDto);
  }

  @ApiOperation({ summary: '공지/이벤트/자주묻는질문 하나 조회' })
  @Get('my-page/notice/:noticeType/:noticeId')
  async getNotice(@Query() noticeDto: NoticeDto) {
    return await this.memberService.getNotice(noticeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자가 등록한 리뷰목록 조회하기' })
  @Get('my-page/review')
  async getReviewList(@Query() memberId: string, memberIdPagingDto: MemberPaginationDto) {
    return await this.memberService.getReviewList(memberId, memberIdPagingDto);
  }
}
