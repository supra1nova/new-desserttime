import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewUpdateDto {
  @ApiProperty({
    example: '1',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: number;

  @ApiProperty({
    example: '1',
    description: '리뷰 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewId: number;

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
  readonly dessertCategoryId: number;

  @ApiProperty({
    example: '4',
    description: '점수',
    required: true,
  })
  @IsNotEmpty()
  readonly score: number;

  @ApiProperty({
    example: '[1,2,3]',
    description: '선택된 재료Id list',
    required: true,
  })
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
    example: 'true',
    description: '작성완료(true), 뒤로가기(false) 여부',
    required: true,
  })
  @IsNotEmpty()
  readonly isSaved: boolean;
}
