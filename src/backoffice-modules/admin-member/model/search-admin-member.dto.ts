import { PageRequest } from '../../common/dto/page.request';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemberSearchEnum } from './member.enum';
import { Transform } from 'class-transformer';

export class SearchAdminMemberDto extends PageRequest {
  @IsBoolean()
  @IsOptional()
  @Transform(({ obj }) => obj.isUsable === 'true')
  @ApiProperty({
    type: () => Boolean,
    isArray: false,
    description: '상태',
    required: false,
  })
  readonly isUsable?: string;

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
