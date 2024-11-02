import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateReviewImgDto } from '../../../client-modules/review/dto/reviewimg.change.dto';

export class UpdateAdminReviewDto {
  @ApiProperty({
    type: () => Number,
    description: 'review id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  reviewId: number;

  @ApiProperty({
    type: () => Number,
    description: '2차 카테고리 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly dessertCategoryId: number;

  @ApiProperty({
    type: String,
    description: '가게명',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly storeName: string;

  @ApiProperty({
    type: String,
    description: '메뉴명',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly menuName: string;

  @ApiProperty({
    type: String,
    description: '리뷰 내용',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly content?: string;

  @ApiProperty({
    type: String,
    description: '관리자 메모',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly adminMemo?: string;

  @ApiProperty({
    type: Array,
    items: { type: 'number' },
    description: '재료 id 배열',
    required: false,
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  readonly reviewIngredientIdArr?: number[];

  @ApiProperty({
    type: Array,
    description: '리뷰 이미지 객체 배열',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateReviewImgDto)
  readonly reviewImgs?: UpdateReviewImgDto[];
}
