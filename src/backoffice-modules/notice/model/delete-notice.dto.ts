import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNoticeDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: '공지사항 순번',
    required: true,
  })
  readonly noticeId: number;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: '공지사항 삭제여부',
    required: true,
  })
  readonly isUsable: boolean;

  constructor(noticeId: number, isUsable: boolean) {
    this.noticeId = noticeId;
    this.isUsable = isUsable;
  }
}
