import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class NoticeDto {
  @ApiProperty({
    example: '공지조회 :NOTICE / 이벤트조회:EVENT / 자주묻는 질문:FAQ',
    description: '공지, 이벤트 목록조회',
    required: true,
  })
  @IsNotEmpty()
  readonly noticeType: string;

  @ApiProperty({
    example: '1',
    description: '공지/이벤트 하나조회',
    required: true,
  })
  @IsNotEmpty()
  readonly noticeId: number;
}
