import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MemberGenderEnum } from './member.enum';

export class UpdateAdminMemberDto {
  @ApiProperty({
    example: '홍길동',
    description: '회원 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly nickName: string;

  @ApiProperty({
    example: '자주 부정적인 후기를 등록하는 회원임',
    description: '관리자 메모',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly memo: string;

  @ApiProperty({
    example: 'M',
    description: '회원 성별( M:남성 / F:여성 / N:선택안함 )',
    required: false,
  })
  @IsEnum(MemberGenderEnum)
  @IsNotEmpty()
  readonly gender: MemberGenderEnum;

  @ApiProperty({
    example: '서울시',
    description: '1차 지역',
    required: true,
  })
  @IsString()
  @IsOptional()
  firstCity: string;

  @ApiProperty({
    example: 'OO구',
    description: '2차 지역',
    required: true,
  })
  @IsString()
  @IsOptional()
  secondaryCity: string;

  @ApiProperty({
    example: 'OO동',
    description: '3차 지역',
    required: true,
  })
  @IsString()
  @IsOptional()
  thirdCity: string;

  @ApiProperty({
    example: '[1, 2, 3, 4]',
    description: '1차 디저트 카테고리 id 배열',
    required: true,
  })
  @IsArray()
  @IsOptional()
  uidIdArr: number[];
}
