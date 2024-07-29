import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdminPointHistoryService } from './admin-point-history.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchAdminPointHistoryDto } from './model/search-admin-point-history.dto';

@ApiTags('Admin Point History')
@Controller('admin/point-history')
export class AdminPointHistoryController {
  constructor(private readonly adminPointHistoryService: AdminPointHistoryService) {}

  @ApiOperation({ summary: '특정 회원 포인트 내역 전체 조회' })
  @Get(':memberId')
  findAllByMemberId(@Param('memberId') memberId: number, @Query() searchAdminPointHistoryDto: SearchAdminPointHistoryDto) {
    return this.adminPointHistoryService.processFindAllByMemberId(memberId, searchAdminPointHistoryDto);
  }
}
