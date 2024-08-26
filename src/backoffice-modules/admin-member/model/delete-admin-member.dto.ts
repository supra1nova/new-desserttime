import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class DeleteAdminMemberDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: '회원 순번',
    required: true,
  })
  readonly memberId: number;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: '회원 삭제여부',
    required: true,
  })
  readonly isUsable: boolean;

  constructor(memberId: number, isUsable: boolean) {
    this.memberId = memberId;
    this.isUsable = isUsable;
  }
}
