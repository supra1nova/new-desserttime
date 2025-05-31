import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdminPointHistoryService } from './admin-point-history.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SearchAdminPointHistoryDto } from './model/search-admin-point-history.dto';

@ApiTags('Admin Point History')
@Controller('admin/point-history')
export class AdminPointHistoryController {
  constructor(private readonly adminPointHistoryService: AdminPointHistoryService) {}

  @ApiOperation({ summary: '특정 회원 포인트 내역 전체 조회' })
  @ApiParam({
    name: 'memberId',
    type: String,
    description: '회원 아이디',
  })
  @Get(':memberId')
  async findAllByMemberId(@Param('memberId') memberId: string, @Query() searchAdminPointHistoryDto: SearchAdminPointHistoryDto) {
    return this.adminPointHistoryService.processFindAllByMemberId(memberId, searchAdminPointHistoryDto);
  }
}
