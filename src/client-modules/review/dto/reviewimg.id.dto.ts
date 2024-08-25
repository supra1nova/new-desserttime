import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewImgIdDto {
  @ApiProperty({
    example: '1',
    description: '리뷰이미지 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewImgId: number;
}
