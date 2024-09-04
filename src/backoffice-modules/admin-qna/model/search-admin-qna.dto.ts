import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageRequest } from '../../common/dto/page.request';
import { Transform } from 'class-transformer';

export class SearchAdminQnaDto extends PageRequest {
  @IsBoolean()
  @IsOptional()
  @Transform(({ obj }) => obj.isAnswered === 'true')
  @ApiProperty({
    type: () => Boolean,
    isArray: false,
    description: '답변 여부 : true / false',
    required: false,
  })
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
