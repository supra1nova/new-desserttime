import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostAccusationDto {
  @ApiProperty({
    example: 'ETC',
    description: '신고사유-라디오버튼항목',
    required: true,
  })
  @IsNotEmpty()
  readonly reason: string;

  @ApiProperty({
    example: '맛없는데,맛있데요',
    description: '기타-신고사유작성내용',
    required: true,
  })
  readonly content: string;

  @ApiProperty({
    example: '1',
    description: '사용자ID',
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
}
