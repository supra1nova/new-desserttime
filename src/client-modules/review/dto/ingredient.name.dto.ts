import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IngredientNameDto {
  @ApiProperty({
    example: '견과류',
    description: '재료명',
    required: true,
  })
  @IsNotEmpty()
  readonly ingredientName: string;
}
