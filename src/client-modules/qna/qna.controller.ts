import { Body, Controller, Get, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { QnAService } from './qna.service';
import { QnAIdDto } from './dto/qna.id.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQnADto } from './dto/create.qna.dto';
import { JwtAuthGuard } from 'src/config/auth/jwt/jwt.guard';

@ApiTags('QnA')
@Controller('qna')
export class QnAController {
  constructor(private qnaService: QnAService) {}

  @ApiOperation({ summary: '문의 하나 생성하기' })
  @Post()
  async postQnA(@Body() createQnADto: CreateQnADto) {
    return await this.qnaService.postQnA(createQnADto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '문의 1개 조회하기' })
  @Get()
  async getQnA(@Query() qnAIdDto: QnAIdDto) {
    return await this.qnaService.getQnA(qnAIdDto);
  }
}
