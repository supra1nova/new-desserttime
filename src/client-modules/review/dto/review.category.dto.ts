import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CursorPaginationDto } from 'src/common/pagination/dto/cursor.pagination.dto';

export class ReviewCategoryDto extends CursorPaginationDto {
  @ApiProperty({
    example: '1',
    description: '카테고리 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly dessertCategoryId: number;

  @ApiProperty({
    example: 'D',
    description: '정렬기준: L-좋아요순 / D-최신순 ',
    required: true,
  })
  @IsNotEmpty()
  readonly selectedOrder: string;

  @ApiProperty({
    example: '1',
    description: '조회한 사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: number;
}
