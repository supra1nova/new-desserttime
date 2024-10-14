import { Controller, Get, Query } from '@nestjs/common';
import { AdminReviewService } from './admin-review.service';
import { AdminSearchReviewDto } from './dto/admin-search-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin review')
@Controller('admin-review')
export class AdminReviewController {
  constructor(private readonly adminReviewService: AdminReviewService) {}

  @ApiOperation({ summary: '전체 리뷰 목록 조회' })
  @Get()
  async findAll(@Query() adminSearchReviewDto: AdminSearchReviewDto) {
    return this.adminReviewService.findAll(adminSearchReviewDto);
  }

  /*
  @Post()
  create(@Body() createAdminReviewDto: CreateAdminReviewDto) {
    return this.adminReviewService.create(createAdminReviewDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminReviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminReviewDto: UpdateAdminReviewDto) {
    return this.adminReviewService.update(+id, updateAdminReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminReviewService.remove(+id);
  }
  */
}
