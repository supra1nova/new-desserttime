import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NoticeDto {
  @ApiProperty({
    description: '공지사항 일련번호',
    example: '1',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly noticeId: string;

  @ApiProperty({
    description: '공지사항 제목',
    example: '공지사항 제목입니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: '공지사항 본문',
    example: '공지사항 본문입니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    description: 'isNotice',
    example: 'true',
    required: true,
  })
  @IsBoolean()
  readonly isNotice: boolean;

  @ApiProperty({
    description: '게시글 상단고정 여부',
    example: 'true',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isTopFixed: boolean;

  @ApiProperty({
    description: '게시글 삭제여부',
    example: 'true',
    required: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isDeleted: boolean;

  @ApiProperty({
    description: '게시글 작성일',
    example: '2024-01-01',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  readonly createDate: Date;

  @ApiProperty({
    description: '게시글 수정일',
    example: '2024-01-01',
    required: false,
  })
  @IsDate()
  readonly updateDate: Date;
}
