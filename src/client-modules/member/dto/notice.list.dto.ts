import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class NoticeListDto {
  @Transform((value) => {
    return value.value == 'true' ? true : false;
  })
  @ApiProperty({
    example: '공지조회 :NOTICE / 이벤트조회:EVENT / 자주묻는 질문:FNQ',
    description: '공지, 이벤트 목록조회',
    required: true,
  })
  @IsNotEmpty()
  readonly noticeType: string;
}
