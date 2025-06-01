import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    example: 'aaaaaaa',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: string;

  @ApiProperty({
    example: 'aaaaaaa',
    description: '리뷰 Id',
    required: false,
  })
  @IsOptional()
  reviewId: string;

  @ApiProperty({
    example: '온혜화',
    description: '가게명',
    required: true,
  })
  @IsNotEmpty()
  readonly storeName: string;

  @ApiProperty({
    example: '치츠케이꾸',
    description: '메뉴명',
    required: true,
  })
  @IsNotEmpty()
  readonly menuName: string;

  @ApiProperty({
    example: '1',
    description: '디저트 카테고리 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly dessertCategoryId: string;

  @ApiProperty({
    example: '4',
    description: '점수',
    required: true,
  })
  @IsNotEmpty()
  readonly score: number;

  @ApiProperty({
    example: '[1,2]',
    description: '선택된 재료Id list',
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly ingredientId: number[];

  @ApiProperty({
    example: '정말정말 맛있습니다. 분위기도 좋고요. 사장님도 친절했어요. 또 올게요! 단골예약~',
    description: '후기 내용',
    required: true,
  })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    example: 'SAVED',
    description: '작성완료 : SAVED',
    required: true,
  })
  @IsNotEmpty()
  readonly status: string;
}
