import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AccusationService } from './accusation.service';
import { PostAccusationDto } from './dto/post.accusation.dto';
import { AccusationRecordDto } from './dto/accusation.record.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/auth/jwt/jwt.guard';

@ApiTags('Accusation')
@Controller('accusation')
export class AccusationController {
  constructor(private accusationService: AccusationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '신고항목 (라디오버튼리스트)' })
  @Get()
  async getAccusationList() {
    return await this.accusationService.getAccuList();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리뷰 신고하기 하나 등록' })
  @ApiBody({
    description: `
    reason: 선택된 신고사유 {    "COPYRIGHT_INFRINGEMENT": "저작권 침해", "OBSCENE": "음란/선정적", "ABUSE": "욕설", "PRIVATE": "개인정보 노출", "ETC": "기타(직접입력)"    }\n
    content : ETC (기타) - 신고사유내용, \n 
    memberId : 사용자 id, \n
    reviewId : 리뷰 id`,
    type: PostAccusationDto,
  })
  @Post()
  async postAccusation(@Body() postAccusationDto: PostAccusationDto) {
    return await this.accusationService.postAccusation(postAccusationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '해당 리뷰 신고이력 확인' })
  @Get('record/:reviewId/:memberId')
  async getPreAccuRecord(@Param() accusationRecordDto: AccusationRecordDto) {
    return await this.accusationService.getPreAccuRecord(accusationRecordDto);
  }
}
