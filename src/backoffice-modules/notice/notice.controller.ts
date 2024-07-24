import { Controller, Get, Post, Body, Query, Patch, Param, Delete } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchNoticeDto } from './dto/search-notice.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@ApiTags('Notice')
@Controller('notice')
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
  @Get(":id")
  findOneById(@Param("id") id: number) {
    return this.noticeService.findOneById(id);
  }

  @ApiOperation({ summary: '공지사항 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(+id, updateNoticeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noticeService.delete(+id);
  }
}
