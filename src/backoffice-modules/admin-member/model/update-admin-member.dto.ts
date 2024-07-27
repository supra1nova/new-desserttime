import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MemberGenderEnum } from './member.enum';

export class UpdateAdminMemberDto {
  @ApiProperty({
    example: '홍길동.',
    description: '회원 이름입니다.',
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly nickName: string;

  @ApiProperty({
    example: '자주 부정적인 후기를 등록하는 회원임',
    description: '관리자의 메모입니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly memo: string;

  @ApiProperty({
    example: 'MALE',
    description: '회원의 성별입니다 : m:남성 / f:여성 / n:선택안함',
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
  @IsNotEmpty()
  firstCity: string;

  @ApiProperty({
    example: 'OO구',
    description: '2차 지역',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  secondaryCity: string;

  @ApiProperty({
    example: 'OO동',
    description: '3차 지역',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  thirdCity: string;

  /*@ApiProperty({
    example: `[{UIDid: 1},{UIDid: 2},{UIDid: 3},{UIDid: 4}]`,
    description: '1차 디저트 카테고리 id 배열',
    required: true,
  })
  @ArrayNotEmpty()
  uids: UserInterestDessert[];*/
}
