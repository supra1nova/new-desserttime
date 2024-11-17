import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QnAIdDto {
  @ApiProperty({
    example: '1',
    description: '문의하기 id',
    required: true,
  })
  @IsNotEmpty()
  readonly qId: number;
}
