import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReviewImgDto {
  @ApiProperty({
    type: String,
    description: '리뷰 이미지 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  reviewImgId: string;

  @ApiProperty({
    type: Number,
    description: '이미지 순서',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  num: number;

  @ApiProperty({
    type: () => Boolean,
    description: '대표 이미지 여부 ',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isMain: boolean;

  @ApiProperty({
    type: () => Boolean,
    description: '이미지 사용 여부 ',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isUsable: boolean;
}
