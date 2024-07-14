import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LikeDto {
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

  @Transform((value) => {
    return value.value == 'true' ? true : false;
  })
  @ApiProperty({
    example: 'true',
    description: 'like : true / unlike : false',
    required: true,
  })
  @IsNotEmpty()
  readonly isLike: boolean;
}
