import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    description: '관리자 회원 이메일',
    example: 'dessert1@naver.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: '비밀번호',
    example: '1234',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
