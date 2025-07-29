import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LikeDto {
  @ApiProperty({
    example: 'aaaaaa',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: string;

  @ApiProperty({
    example: 'bbbbbb',
    description: '리뷰 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewId: string;

  @Transform((value) => {
    return value.value == 'true';
  })
  @ApiProperty({
    example: 'true',
    description: 'like : true / unlike : false',
    required: true,
  })
  @IsNotEmpty()
  readonly isLike: boolean;
}
