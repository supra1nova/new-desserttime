import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FirstCategoryAppendDto {
  @ApiProperty({
    example: '2',
    description: '카테고리 차수 1차:1/ 2차:2/',
    required: true,
  })
  @IsNotEmpty()
  readonly sessionNum: number;

  @ApiProperty({
    example: '1',
    description: '부모 차수의 DessertCategoryId // 등록하려는 차수가 1차면 0입력 ',
    required: true,
  })
  @IsNotEmpty()
  readonly parentDCId: number;

  @ApiProperty({
    example: '디저트명',
    description: '디저트명',
    required: true,
  })
  @IsNotEmpty()
  readonly dessertName: string;
}
