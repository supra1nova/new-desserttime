import { Controller, Get, Post, Body, Query, Patch, Param, Delete } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './model/create-notice.dto';
import { SearchNoticeDto } from './model/search-notice.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateNoticeDto } from './model/update-notice.dto';

@ApiTags('Admin notice')
@Controller('admin/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @ApiOperation({ summary: '전체 공지사항 목록 조회' })
  @Get()
  findAll(@Query() searchNoticeDto: SearchNoticeDto) {
    return this.noticeService.findAll(searchNoticeDto);
  }

  @ApiOperation({ summary: '신규 공지사항 삽입' })
  @ApiBody({
    type: CreateNoticeDto,
    description: `
      title: 제목,
      content: 본문,
      isTopFixed: 상단 고정 여부 - true / false
    `,
  })
  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeService.create(createNoticeDto);
  }

  @ApiOperation({ summary: '공지사항 조회 by noticeId' })
  @ApiParam({
    name: 'noticeId',
    type: Number,
    description: 'notice 아이디',
  })
  @Get(':noticeId')
  findOneById(@Param('noticeId') noticeId: number) {
    return this.noticeService.findOneById(noticeId);
  }

  @ApiOperation({ summary: '공지사항 수정' })
  @ApiParam({
    name: 'noticeId',
    type: Number,
    description: 'notice 아이디',
  })
  @ApiBody({
    type: UpdateNoticeDto,
    description: `
      title: 제목,
      content: 본문,
      isTopFixed: 상단 고정 여부 - true / false
    `,
  })
  @Patch(':noticeId')
  update(@Param('noticeId') noticeId: number, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(+noticeId, updateNoticeDto);
  }

  @ApiOperation({ summary: '공지사항 삭제' })
  @ApiParam({
    name: 'noticeId',
    type: Number,
    description: 'notice 아이디',
  })
  @Delete(':noticeId')
  delete(@Param('noticeId') noticeId: number) {
    return this.noticeService.delete(+noticeId);
  }
}
