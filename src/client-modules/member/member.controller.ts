import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { MemberService } from './member.service';
import { UserValidationDto } from './dto/login.dto';
import { MemberIdDto } from './dto/member.id';
import { MemberDeleteDto } from './dto/member.delete.dto';
import { MemberAdDto } from './dto/member.add.dto';
import { MemberAlarmDto } from './dto/member.alarm.dto';
import { NoticeListDto } from './dto/notice.list.dto';
import { NoticeDto } from './dto/notice.dto';
import { NickNameDto } from './dto/nickname.dto';
import { MemberUpdateDto } from './member.update.dto';
import { MemberPointListDto } from './dto/member.pointlist.dto';
import { MemberIdPagingDto } from './dto/member.id.paging.dto';
import { JwtAuthGuard } from 'src/config/auth/jwt/jwt.guard';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('signin')
  async memberSignIn(@Body() signInDto: SignInDto) {
    return await this.memberService.memberSignIn(signInDto);
  }

  @ApiOperation({ summary: '사용자 유효성 검사' })
  @Get('validation/:snsId')
  async memberValidate(@Param() userValidationDto: UserValidationDto) {
    return await this.memberService.memberValidate(userValidationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 첫 화면 사용자 정보 요약' })
  @Get('/my-page/:memberId')
  async myPageOverview(@Param() memberIdDto: MemberIdDto) {
    return await this.memberService.myPageOverview(memberIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 사용자 정보 조회' })
  @Get('/my-page/member/:memberId')
  async getMemberOne(@Query() memberIdDto: MemberIdDto) {
    return await this.memberService.getMemberOne(memberIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 닉네임 중복체크 //false: 사용불가' })
  @Get('/my-page/nickname/:nickname')
  async isUsableNickName(@Query() nickNameDto: NickNameDto) {
    return await this.memberService.isUsableNickName(nickNameDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 사용자 정보 수정하기 // id를 제외한 요청데이터들은 optional이라 입력안해도됨!' })
  @Patch('/my-page')
  async patchMember(@Query() memberUpdateDto: MemberUpdateDto) {
    return await this.memberService.patchMember(memberUpdateDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '마이페이지 - 설정 - 광 고,알람 수신여부 조회' })
  @Get('/my-page/config/:memberId')
  async getAlarmAndADStatue(@Param() memberIdDto: MemberIdDto) {
    return await this.memberService.getAlarmAndADStatue(memberIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '광고수신여부 변경' })
  @Patch('/my-page/alarm/:memberId')
  async patchAlarmStatus(@Query() memberAlarmDto: MemberAlarmDto) {
    return await this.memberService.patchAlarmStatus(memberAlarmDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '광고수신여부 변경' })
  @Patch('/my-page/ad/:memberId')
  async patchAdStatus(@Query() memberAdDto: MemberAdDto) {
    return await this.memberService.patchAdStatus(memberAdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '탈퇴사유 항목 조회(라디오버튼)' })
  @Get('my-page/deletion/reason')
  async getReasonForLeaving() {
    return await this.memberService.getReasonForLeaving();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴하기' })
  @Delete('my-page/deletion')
  async deleteMember(@Query() memberDeleteDto: MemberDeleteDto) {
    return await this.memberService.deleteMember(memberDeleteDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '총 적립포인트/이번달 적립포인트' })
  @Get('my-page/point/:memberId')
  async getPoint(@Param() memberIdDto: MemberIdDto) {
    return await this.memberService.getPoint(memberIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '보유밀 상세내역' })
  @Get('my-page/point/list/:memberId')
  async getPointHisoryList(@Query() memberPointListDto: MemberPointListDto) {
    return await this.memberService.getPointHisoryList(memberPointListDto);
  }

  @ApiOperation({ summary: '공지/이벤트/자주묻는질문 목록 조회' })
  @Get('my-page/notice/list/:noticeType')
  async getNoticeList(@Query() noticeListDto: NoticeListDto) {
    return await this.memberService.getNoticeList(noticeListDto);
  }

  @ApiOperation({ summary: '공지/이벤트/자주묻는질문 하나 조회' })
  @Get('my-page/notice/:noticeType/:noticeId')
  async getNoticeOne(@Query() noticeDto: NoticeDto) {
    return await this.memberService.getNoticeOne(noticeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자가 등록한 리뷰목록 조회하기' })
  @Get('my-page/review/list')
  async getMyReviewList(@Query() memberIdPagingDto: MemberIdPagingDto) {
    return await this.memberService.getMyReviewList(memberIdPagingDto);
  }
}
