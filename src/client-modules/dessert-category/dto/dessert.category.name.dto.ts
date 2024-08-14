import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DessertCategoryNameDto {
  @ApiProperty({
    example: '스콘',
    description: '카테고리 Name',
    required: true,
  })
  @IsNotEmpty()
  readonly dessertName: string;
}
