import { PageRequest } from '../../common/dto/page.request';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SearchOrder, MemberSearchType } from '../../../common/enum/member.enum';
import { Transform } from 'class-transformer';

export class SearchAdminMemberDto extends PageRequest {
  @ApiProperty({
    type: () => Boolean,
    isArray: false,
    description: '회원가입 상태: true / false',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ obj }) => obj.isUsable === 'true')
  readonly isUsable?: string;

  @ApiProperty({
    enum: MemberSearchType,
    isArray: false,
    description: '검색어 종류: memberEmail / nickName',
    required: false,
  })
  @IsEnum(MemberSearchType)
  @IsOptional()
  readonly searchType?: MemberSearchType;

  @ApiProperty({
    type: String,
    description: '검색값',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly searchValue?: string;

  @ApiProperty({
    enum: SearchOrder,
    isArray: false,
    description: '회원정렬순서: DESC / ASC',
    required: false,
  })
  @IsEnum(SearchOrder)
  @IsOptional()
  readonly orderValue?: SearchOrder = SearchOrder.DESC;
}
