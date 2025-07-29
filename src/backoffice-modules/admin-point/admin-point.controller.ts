import { Controller, Post, Body, Param } from '@nestjs/common';
import { AdminPointService } from './admin-point.service';
import { UpdateAdminPointDto } from './model/update-admin-point.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Point')
@Controller('admin/point')
export class AdminPointController {
  constructor(private readonly adminPointService: AdminPointService) {}

  @ApiOperation({ summary: '포인트 적립' })
  @ApiParam({
    name: 'memberId',
    type: Number,
    description: '회원 아이디',
    example: 4,
  })
  @Post('save/:memberId')
  async save(@Param('memberId') memberId: string, @Body() createAdminPointDto: UpdateAdminPointDto) {
    return await this.adminPointService.saveRecallPoint('save', memberId, createAdminPointDto);
  }

  @ApiOperation({ summary: '포인트 회수' })
  @ApiParam({
    name: 'memberId',
    type: Number,
    description: '회원 아이디',
    example: 4,
  })
  @Post('recall/:memberId')
  async recall(@Param('memberId') memberId: string, @Body() createAdminPointDto: UpdateAdminPointDto) {
    return await this.adminPointService.saveRecallPoint('recall', memberId, createAdminPointDto);
  }
}
