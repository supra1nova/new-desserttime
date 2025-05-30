import { Controller, Get, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminMemberService } from './admin-member.service';
import { SearchAdminMemberDto } from './model/search-admin-member.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateAdminMemberDto } from './model/update-admin-member.dto';

@ApiTags('Admin Member')
@Controller('admin/member')
export class AdminMemberController {
  constructor(private readonly adminMemberService: AdminMemberService) {}

  @ApiOperation({ summary: '전체 회원 목록 조회' })
  @Get()
  async findAll(@Query() searchAdminMemberDto: SearchAdminMemberDto) {
    return this.adminMemberService.findAll(searchAdminMemberDto);
  }

  @ApiOperation({ summary: '회원 정보 단건 조회' })
  @ApiParam({
    name: 'memberId',
    type: Number,
    description: '회원 아이디',
  })
  @Get(':memberId')
  async findOne(@Param('memberId') memberId: string) {
    return this.adminMemberService.findOneById(memberId);
  }

  @ApiOperation({ summary: '회원 정보 수정' })
  @ApiParam({
    name: 'memberId',
    type: Number,
    description: '회원 아이디',
  })
  @ApiBody({
    type: UpdateAdminMemberDto,
    description: `
      nickName: 회원 이름
      memo: 관리자 메모
      gender: 회원 성별( M:남성 / F:여성 / N:선택안함 )
      firstCity: 1차 지역
      secondaryCity: 2차 지역
      thirdCity: 3차 지역
      type: 회원 유형( N: 일반회원 normal user, P: 프로회원 pro user, A: 관리자 admin)
      isAgreeAD: 광고 수신 동의 여부( true: 동의, false: 비동의 )
      isAgreeAlarm: 알림 수신 동의 여부( true: 동의, false: 비동의 )
      uidIdArr: 관심디저트 - 1차 디저트 카테고리 id 배열
  `,
  })
  @Patch(':memberId')
  async update(@Param('memberId') memberId: string, @Body() updateAdminMemberDto: UpdateAdminMemberDto) {
    return this.adminMemberService.update(memberId, updateAdminMemberDto);
  }

  @ApiOperation({ summary: '회원 삭제' })
  @ApiParam({
    name: 'memberId',
    type: Number,
    description: '회원 아이디',
  })
  @Delete(':memberId')
  async delete(@Param('memberId') memberId: string) {
    return this.adminMemberService.delete(memberId);
  }
}
