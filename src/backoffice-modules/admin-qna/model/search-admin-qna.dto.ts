import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageRequest } from '../../common/dto/page.request';

export class SearchAdminQnaDto extends PageRequest {
  @IsBoolean()
  @ApiProperty({
    type: () => Boolean,
    description: '답변 상태',
    required: false,
  })
  @IsOptional()
  readonly isAnswered?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: '질문자 이메일 주소',
    required: false,
  })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: '검색 내용',
    required: false,
  })
  readonly content?: string;
}
