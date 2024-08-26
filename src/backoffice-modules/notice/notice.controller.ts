import { Controller, Get, Post, Body, Query, Patch, Param, Delete } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './model/create-notice.dto';
import { SearchNoticeDto } from './model/search-notice.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @Post()
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeService.create(createNoticeDto);
  }

  @ApiOperation({ summary: '공지사항 조회 by noticeId' })
  @Get(':noticeId')
  findOneById(@Param('noticeId') noticeId: number) {
    return this.noticeService.findOneById(noticeId);
  }

  @ApiOperation({ summary: '공지사항 수정' })
  @Patch(':noticeId')
  update(@Param('noticeId') noticeId: number, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(+noticeId, updateNoticeDto);
  }

  @Delete(':noticeId')
  delete(@Param('noticeId') noticeId: number) {
    return this.noticeService.delete(+noticeId);
  }
}
