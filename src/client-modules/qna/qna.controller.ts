import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { QnAService } from './qna.service';
import { QnAIdDto } from './dto/qna.id.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQnADto } from './dto/create.qna.dto';
import { TransactionInterceptor } from 'src/config/interceptor/transaction.interceptor';

@ApiTags('QnA')
@Controller('qna')
export class QnAController {
    constructor(private qnaService:QnAService){}

    @UseInterceptors(TransactionInterceptor)
    @ApiOperation({summary:"문의 하나 생성하기"})
    @Post()
    async postQnA(@Body() createQnADto:CreateQnADto){
        return await this.qnaService.postQnA(createQnADto);
    }

    @UseInterceptors(TransactionInterceptor)
    @ApiOperation({summary:'문의 1개 조회하기'})
    @Get()
    async getQnA(@Query() qnAIdDto:QnAIdDto){
        return await this.qnaService.getQnA(qnAIdDto);
    }

    @UseInterceptors(TransactionInterceptor)
    @ApiOperation({summary:'문의 목록 전체 조회하기'})
    @Get('list')
    async getQnAList(){
        return await this.qnaService.getQnAList();
    }
}
