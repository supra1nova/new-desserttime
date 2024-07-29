import { Controller, Post, Body, Param } from '@nestjs/common';
import { AdminPointService } from './admin-point.service';
import { UpdateAdminPointDto } from './model/update-admin-point.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Point')
@Controller('admin/point')
export class AdminPointController {
  constructor(private readonly adminPointService: AdminPointService) {}

  @ApiOperation({ summary: '포인트 적립/회수' })
  @Post(':memberId')
  async insert(@Param('memberId') memberId: number, @Body() createAdminPointDto: UpdateAdminPointDto) {
    return await this.adminPointService.processUpdatePoint(memberId, createAdminPointDto);
  }
}
