import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DessertSessionDto {
  @ApiProperty({
    example: '1',
    description: '카테고리 차수 1차:1 , 2차:2',
    required: true,
  })
  @IsNotEmpty()
  readonly sessionNum: number;
}
