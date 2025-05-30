import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QnaDto {
  @ApiProperty({
    example: 'aaaaa',
    description: '문의하기 id',
    required: true,
  })
  @IsNotEmpty()
  readonly qnaId: string;
}
