import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AccusationEnum } from 'src/common/enum/accusation.enum';

export class PostAccusationDto {
  @Transform((value) => {
    const key = value.value;
    return key == 'ETC' ? AccusationEnum.ETC : key == 'ABUSE' ? AccusationEnum.ABUSE : key == 'PRIVATE' ? AccusationEnum.PRIVATE : key == 'OBSCENE' ? AccusationEnum.OBSCENE : AccusationEnum.COPYRIGHT_INFRINGEMENT;
  })
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
    required: false,
  })
  readonly content: string;

  @ApiProperty({
    example: '1',
    description: '신고하는 당사자의 ID',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: number;

  @ApiProperty({
    example: '21',
    description: '신고할 리뷰 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly reviewId: number;
}
