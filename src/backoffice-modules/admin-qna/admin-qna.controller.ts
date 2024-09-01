import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminQnaService } from './admin-qna.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchAdminQnaDto } from './model/search-admin-qna.dto';

@ApiTags('Admin review')
@Controller('admin/qna')
export class AdminQnaController {
  constructor(private readonly adminQnaService: AdminQnaService) {}

  @ApiOperation({ summary: '전체 QnA 목록 조회' })
  @Get()
  findAll(@Query() searchAdminQnaDto: SearchAdminQnaDto) {
    return this.adminQnaService.findAll(searchAdminQnaDto);
  }

  /*@Post()
  create(@Body() createAdminQnaDto: CreateAdminQnaDto) {
    return this.adminQnaService.create(createAdminQnaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminQnaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminQnaDto: UpdateAdminQnaDto) {
    return this.adminQnaService.update(+id, updateAdminQnaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminQnaService.remove(+id);
  }*/
}
