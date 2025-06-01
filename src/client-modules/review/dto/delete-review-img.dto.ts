import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteReviewImgDto {
  @ApiProperty({
    example: 'aaaaa',
    description: '리뷰이미지 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewImgId: string;
}
