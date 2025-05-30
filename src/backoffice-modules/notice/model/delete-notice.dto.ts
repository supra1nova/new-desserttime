import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNoticeDto {
  constructor(noticeId: string, isUsable: boolean) {
    this.noticeId = noticeId;
    this.isUsable = isUsable;
  }

  @IsNumber()
  @ApiProperty({
    type: String,
    description: '공지사항 순번',
    required: true,
  })
  readonly noticeId: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: '공지사항 삭제여부',
    required: true,
  })
  readonly isUsable: boolean;

}
