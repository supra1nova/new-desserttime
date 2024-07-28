import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdminMemberService } from './admin-member.service';
import { SearchAdminMemberDto } from './model/search-admin-member.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateAdminMemberDto } from './model/update-admin-member.dto';

@ApiTags('Admin member')
@Controller('admin/member')
export class AdminMemberController {
  constructor(private readonly adminMemberService: AdminMemberService) {}

  @ApiOperation({ summary: '전체 회원 목록 조회' })
  @Get()
  findAll(@Query() searchAdminMemberDto: SearchAdminMemberDto) {
    return this.adminMemberService.findAll(searchAdminMemberDto);
  }

  @ApiOperation({ summary: '회원 정보 단건 조회' })
  @Get(':memberId')
  findOne(@Param('memberId') memberId: number) {
    return this.adminMemberService.processFindOneById(+memberId);
  }

  @ApiOperation({ summary: '회원 정보 수정' })
  @Patch(':memberId')
  update(
    @Param('memberId') memberId: number,
    @Body() updateAdminMemberDto: UpdateAdminMemberDto,
  ) {
    return this.adminMemberService.update(+memberId, updateAdminMemberDto);
  }

  @ApiOperation({ summary: '회원 삭제' })
  @Delete(':memberId')
  delete(@Param('memberId') memberId: number) {
    return this.adminMemberService.delete(+memberId);
  }
}
