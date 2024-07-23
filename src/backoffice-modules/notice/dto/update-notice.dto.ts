import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateNoticeDto {
  @ApiProperty({
    example: '1',
    description: '공지사항 일련번호',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly noticeId: number;

  @ApiProperty({
    example: '수정된 공지사항 제목입니다.',
    description: '공지사항 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '수정된 공지사항 본문입니다.',
    description: '공지사항 본문',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    example: 'true',
    description: '공지사항 상단고정 여부',
    required: false,
  })
  @IsBoolean()
  @Optional()
  readonly isTopFixed: boolean;
}
