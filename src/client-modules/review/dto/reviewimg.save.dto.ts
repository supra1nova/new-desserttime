import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewImgSaveDto {
  @ApiProperty({
    example: '1',
    description: '리뷰 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewId: number;

  @ApiProperty({
    example: 'true',
    description: '메인사진이면 true',
    required: true,
  })
  @IsNotEmpty()
  readonly isMain: boolean;

  @ApiProperty({
    example: '1',
    description: '사진순서(메인은 1)',
    required: true,
  })
  @IsNotEmpty()
  readonly num: number;
}
