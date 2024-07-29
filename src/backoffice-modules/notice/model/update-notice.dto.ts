import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoticeDto {
  @ApiProperty({
    example: '수정된 공지사항 제목입니다.',
    description: '공지사항 제목',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '수정된 공지사항 본문입니다.',
    description: '공지사항 본문',
    required: false,
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
  @IsOptional()
  readonly isTopFixed: boolean;
}
