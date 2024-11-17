import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
//authGaurd는 strategy를 자동으로 실행시켜주는 기능을 가지고있음
