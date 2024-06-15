import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
    constructor(
        private readonly memberService: MemberService,
      ) {}
    @ApiOperation({ summary: '회원가입' })
    //@UseInterceptors(TransactionInterceptor)
    //@UseGuards(JwtAuthGuard)
    //@ApiBearerAuth()
    @Post('signin')
    async memberSignIn(@Body() signInDto: SignInDto) {
      return await this.memberService.memberSignIn(signInDto);
    }

}
