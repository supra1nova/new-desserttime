import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { SearchNoticeDto } from './dto/search-notice.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(+id, updateNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(+id);
  }*/
}
