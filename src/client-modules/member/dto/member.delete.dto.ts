import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MemberDeleteDto {
  @ApiProperty({
    example: '1',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: number;

  @ApiProperty({
    example: 'ETC',
    description: '탈퇴 사유',
    required: true,
  })
  @IsNotEmpty()
  readonly reasonForLeaving: string;

  @ApiProperty({
    example: '잼이없어요',
    description: '탈퇴사유-기타 내용',
    required: false,
  })
  readonly context: string;
}
