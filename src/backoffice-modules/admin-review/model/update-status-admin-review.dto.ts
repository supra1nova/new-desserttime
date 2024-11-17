import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusAdminReviewDto {
  @ApiProperty({
    type: Array,
    description: 'reviewId 배열',
    example: '[1, 2, 3, 4]',
    required: true,
  })
  @IsArray()
  @IsOptional()
  readonly reviewIdArr: number[];
}
