import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewCategoryDto {
  @ApiProperty({
    example: '1',
    description: '카테고리 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly dessertCategoryId: number;
}
