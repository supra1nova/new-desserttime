import { PageRequest } from '../../common/dto/page.request';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemberEnum } from './member.enum';

export class SearchAdminMemberDto extends PageRequest {
  @IsEnum(MemberEnum)
  @IsOptional()
  @ApiProperty({
    type: MemberEnum,
    description: '검색어 종류',
    required: false,
  })
  readonly searchType?: MemberEnum;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: '검색값',
    required: false,
  })
  readonly searchValue?: string;
}
