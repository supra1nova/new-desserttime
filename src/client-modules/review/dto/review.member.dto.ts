import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ReviewMemberIdDto {
  @ApiProperty({
    example: '7',
    description: '리뷰 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewId: string;
  @ApiProperty({
    example: '1',
    description: '사용자 Id',
    required: false,
  })
  @IsOptional()
  readonly memberId: string;
}
