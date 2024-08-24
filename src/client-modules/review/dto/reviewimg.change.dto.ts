import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReviewImgDto {
  @ApiProperty({ example: 99, description: '리뷰이미지 ID' })
  @IsNotEmpty()
  @IsNumber()
  reviewImgId: number;

  @ApiProperty({ example: 1, description: '이미지 order number' })
  @IsNotEmpty()
  @IsNumber()
  num: number;

  @ApiProperty({ example: true, description: '대표이미지 여부 ' })
  @IsNotEmpty()
  @IsBoolean()
  isMain: boolean;
}
