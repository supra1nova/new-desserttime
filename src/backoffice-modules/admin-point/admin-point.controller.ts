import { Controller, Post, Body, Param } from '@nestjs/common';
import { AdminPointService } from './admin-point.service';
import { UpdateAdminPointDto } from './model/update-admin-point.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@ApiTags('Admin Point')
@Controller('admin/point')
export class AdminPointController {
  constructor(private readonly adminPointService: AdminPointService) {}

  @ApiOperation({ summary: '포인트 적립' })
  @ApiParam({
    name: 'pointFlag',
    type: String,
    description: '적립/회수 경로: save / recall',
    example: 'save',
  })
  @ApiParam({
    name: 'memberId',
    type: Number,
    description: '회원 아이디',
    example: 4,
  })
  @Post(':pointFlag/:memberId')
  async unify(@Param('pointFlag') pointFlag: string, @Param('memberId') memberId: number, @Body() createAdminPointDto: UpdateAdminPointDto) {
    if (pointFlag !== 'save' && pointFlag !== 'recall') throw new RuntimeException('잘못된 접근 경로 입니다.');
    return await this.adminPointService.saveRecallPoint(pointFlag, memberId, createAdminPointDto);
  }
}
