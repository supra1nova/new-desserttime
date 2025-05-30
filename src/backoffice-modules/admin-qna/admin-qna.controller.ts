import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AdminQnaService } from './admin-qna.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SearchAdminQnaDto } from './model/search-admin-qna.dto';
import { ReplyAdminQnaDto } from './model/reply-admin-qna.dto';

@ApiTags('Admin Qna')
@Controller('admin/qna')
export class AdminQnaController {
  constructor(private readonly adminQnaService: AdminQnaService) {}

  @ApiOperation({ summary: '전체 QnA 목록 조회' })
  @Get()
  async findAll(@Query() searchAdminQnaDto: SearchAdminQnaDto) {
    return this.adminQnaService.findAll(searchAdminQnaDto);
  }

  @ApiOperation({ summary: 'qna 정보 단건 조회' })
  @ApiParam({
    name: 'qNAId',
    type: Number,
    description: 'qna 아이디',
  })
  @Get(':qNAId')
  async findOne(@Param('qNAId') qNAId: string) {
    return this.adminQnaService.findOneById(qNAId);
  }

  @ApiOperation({ summary: 'qna 답글 등록/수정' })
  @ApiParam({
    name: 'qNAId',
    type: Number,
    description: 'qna 아이디',
  })
  @ApiBody({
    type: ReplyAdminQnaDto,
    description: `replyContent: 내용 (string, not null)`,
  })
  @Post(':qNAId')
  async reply(@Param('qNAId') qNAId: string, @Body() replyAdminQnaDto: ReplyAdminQnaDto) {
    return this.adminQnaService.processCreateUpdateReply(qNAId, replyAdminQnaDto);
  }
}
