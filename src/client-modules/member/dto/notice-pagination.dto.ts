import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { NoticeType } from 'src/common/enum/noticetype.enum';
import { CursorPaginationDto } from 'src/common/pagination/dto/cursor.pagination.dto';

export class NoticePaginationDto extends CursorPaginationDto {
  @Transform((value) => {
    return value.value == 'NOTICE' ? NoticeType.NOTICE : value.value == 'EVENT' ? NoticeType.EVENT : NoticeType.FAQ;
  })
  @ApiProperty({
    example: '공지조회 :NOTICE / 이벤트조회:EVENT / 자주묻는 질문:FAQ',
    description: '공지, 이벤트 목록조회',
    required: true,
  })
  @IsNotEmpty()
  readonly noticeType: string;
}
