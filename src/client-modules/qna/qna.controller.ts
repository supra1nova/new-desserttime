import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QnaService } from './qna.service';
import { FindQnaDto } from './dto/find-qna.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQnaDto } from './dto/create-qna.dto';
import { JwtAuthGuard } from '../../config/auth/jwt/jwt.guard';

@ApiTags('QnA')
@Controller('qna')
export class QnaController {
  constructor(private qnaService: QnaService) {}

  @ApiOperation({ summary: '문의 하나 생성하기' })
  @Post()
  async postQna(@Body() createQnaDto: CreateQnaDto) {
    return await this.qnaService.postQna(createQnaDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '문의 1개 조회하기' })
  @Get()
  async getQna(@Query() qnaIdDto: FindQnaDto) {
    return await this.qnaService.getQna(qnaIdDto);
  }
}
