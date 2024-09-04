import { PageRequest } from '../../common/dto/page.request';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemberSearchEnum } from './member.enum';
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
    enum: MemberSearchEnum,
    isArray: false,
    description: '검색어 종류: memberEmail / nickName',
    required: false,
  })
  @IsEnum(MemberSearchEnum)
  @IsOptional()
  readonly searchType?: MemberSearchEnum;

  @ApiProperty({
    type: String,
    description: '검색값',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly searchValue?: string;
}
