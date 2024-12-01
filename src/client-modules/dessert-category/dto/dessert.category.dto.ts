import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DessertCategoryIdDto {
  @ApiProperty({
    example: '1',
    description: '카테고리 Id',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly dessertCategoryId: number;
}
