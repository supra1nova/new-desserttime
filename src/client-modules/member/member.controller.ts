import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { MemberService } from './member.service';
import { UserValidationDto } from './dto/login.dto';
import { MemberIdDto } from './dto/member.id';
import { MemberDeleteDto } from './dto/member.delete.dto';
import { MemberAdDto } from './dto/member.add.dto';
import { MemberAlarmDto } from './dto/member.alarm.dto';

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

  @ApiOperation({ summary: '마이페이지 - 첫 화면 사용자 정보 요약' })
  @Get('/my-page/:memberId')
  async myPageOverview(@Param() memberIdDto: MemberIdDto) {
    return await this.memberService.myPageOverview(memberIdDto);
  }

  @ApiOperation({ summary: '마이페이지 - 설정 - 광고,알람 수신여부 조회' })
  @Get('/my-page/config/:memberId')
  async getAlarmAndADStatue(@Param() memberIdDto: MemberIdDto) {
    return await this.memberService.getAlarmAndADStatue(memberIdDto);
  }

  @ApiOperation({ summary: '광고수신여부 변경' })
  @Patch('/my-page/alarm/:memberId')
  async patchAlarmStatus(@Query() memberAlarmDto: MemberAlarmDto) {
    return await this.memberService.patchAlarmStatus(memberAlarmDto);
  }

  @ApiOperation({ summary: '광고수신여부 변경' })
  @Patch('/my-page/ad/:memberId')
  async patchAdStatus(@Query() memberAdDto: MemberAdDto) {
    return await this.memberService.patchAdStatus(memberAdDto);
  }

  @ApiOperation({ summary: '탈퇴사유 항목 조회(라디오버튼)' })
  @Get('my-page/deletion/reason')
  async getReasonForLeaving() {
    return await this.memberService.getReasonForLeaving();
  }

  @ApiOperation({ summary: '회원 탈퇴하기' })
  @Delete('my-page/deletion')
  async deleteMember(@Body() memberDeleteDto: MemberDeleteDto) {
    return await this.memberService.deleteMember(memberDeleteDto);
  }

  @ApiOperation({ summary: '총 적립포인트/이번달 적립포인트' })
  @Get('my-page/point/:memberId')
  async getPoint(@Param() memberIdDto: MemberIdDto) {
    return await this.memberService.getPoint(memberIdDto);
  }
}
