import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class NoticeDto {
  @ApiProperty({
    example: '1',
    description: '공지사항 일련번호',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly noticeId: number;

  @ApiProperty({
    example: '공지사항 제목입니다.',
    description: '공지사항 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '공지사항 본문입니다.',
    description: '공지사항 본문',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    example: 'true',
    description: 'isNotice',
    required: true,
  })
  @IsBoolean()
  readonly isNotice: boolean;

  @ApiProperty({
    example: 'true',
    description: '게시글 상단고정 여부',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isTopFixed: boolean;

  @ApiProperty({
    example: 'true',
    description: '게시글 삭제여부',
    required: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isDeleted: boolean;

  @ApiProperty({
    example: '2024-01-01',
    description: '게시글 작성일',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  readonly createdDate: Date;

  @ApiProperty({
    example: '2024-01-01',
    description: '게시글 수정일',
    required: false,
  })
  @IsDate()
  readonly updatedDate: Date;
}
