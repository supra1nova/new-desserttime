import { Controller, Get, Post } from '@nestjs/common';
import { AccusationService } from './accusation.service';
import { PostAccusationDto } from './dto/post.accusation.dto';
import { AccusationRecordDto } from './dto/accusation.record.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('accusation')
export class AccusationController {
  constructor(private accusationService: AccusationService) {}

  @ApiOperation({ summary: '' })
  @Post('')
  async postAccusation(postAccusationDto: PostAccusationDto) {}

  @ApiOperation({ summary: '' })
  @Get('')
  async getPreAccuRecord(accusationRecordDto: AccusationRecordDto) {}
}
