import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({
    type: String,
    description: '공지사항 제목',
    example: '공지사항 제목입니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    type: String,
    description: '공지사항 본문',
    example: '공지사항 본문입니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    type: () => Boolean,
    description: '공지사항 상단고정 여부',
    example: 'false',
    required: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isTopFixed: boolean;
}
