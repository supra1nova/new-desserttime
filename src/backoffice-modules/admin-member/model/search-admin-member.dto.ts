import { PageRequest } from '../../common/dto/page.request';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemberSearchEnum } from './member.enum';

export class SearchAdminMemberDto extends PageRequest {
  @IsEnum(MemberSearchEnum)
  @IsOptional()
  @ApiProperty({
    enum: MemberSearchEnum,
    isArray: false,
    description: '검색어 종류',
    required: false,
  })
  readonly searchType?: MemberSearchEnum;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: '검색값',
    required: false,
  })
  readonly searchValue?: string;
}
