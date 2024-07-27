import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticeDto {
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
    example: 'false',
    description: '공지사항 상단고정 여부',
    required: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isTopFixed: boolean;
}
