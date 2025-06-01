import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetRegistrableReviewDto {
  @ApiProperty({
    example: '1',
    description: '리뷰 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewId: string;
}
