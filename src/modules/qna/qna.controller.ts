import { Controller, Get, Param, Post } from '@nestjs/common';
import { QnAService } from './qna.service';
import { QnAIdDto } from './dto/qna.id.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQnADto } from './dto/create.qna.dto';

@ApiTags('QnA')
@Controller('qna')
export class QnAController {
    constructor(private qnaService:QnAService){}

    @ApiOperation({summary:"문의 하나 생성하기"})
    @Post()
    async postQnA(createQnADto:CreateQnADto){
        return await this.qnaService.postQnA(createQnADto);
    }

    @ApiOperation({summary:'문의 1개 조회하기'})
    @Get()
    async getQnA(@Param() qnAIdDto:QnAIdDto){
        return await this.qnaService.getQnA(qnAIdDto);
    }

    @ApiOperation({summary:'문의 목록 전체 조회하기'})
    @Get('list')
    async getQnAList(){
        return await this.qnaService.getQnAList();
    }
}
