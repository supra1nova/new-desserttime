import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateReviewImgDto } from './reviewimg.change.dto';

export class UpdateReviewImgListDto {
  @ApiProperty({
    example: [
      { reviewImgId: 99, num: 1, isMain: true },
      { reviewImgId: 98, num: 2, isMain: false },
    ],
    description: '이미지 삭제, 순서변경, 대표사진 변경시 업데이트용 - 변경된 데이터들만 보내도 됩니다.',
    required: true,
    type: [UpdateReviewImgDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateReviewImgDto)
  readonly reviewImg: UpdateReviewImgDto[];
}
