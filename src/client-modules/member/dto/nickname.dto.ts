import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NicknameDto {
  @ApiProperty({
    example: '불타는 고구마 냠 아뜨거',
    description: '사용자 닉네임',
    required: true,
  })
  @IsNotEmpty()
  readonly nickname: string;
}
