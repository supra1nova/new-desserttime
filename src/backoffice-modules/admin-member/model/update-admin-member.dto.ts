import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MemberGender, MemberType } from '../../../common/enum/member.enum';

export class UpdateAdminMemberDto {
  @ApiProperty({
    type: String,
    description: '회원 이름',
    example: '홍길동',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly nickName: string;

  @ApiProperty({
    type: String,
    description: '관리자 메모',
    example: '자주 부정적인 후기를 등록하는 회원임',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly memo: string;

  @ApiProperty({
    type: String,
    description: '회원 성별: M-남성 / F-여성 / N-선택안함 )',
    example: 'M',
    required: false,
  })
  @IsEnum(MemberGender)
  @IsNotEmpty()
  readonly gender: MemberGender;

  @ApiProperty({
    type: String,
    description: '1차 지역',
    example: '서울시',
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly firstCity: string;

  @ApiProperty({
    type: String,
    description: '2차 지역',
    example: 'OO구',
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly secondaryCity: string;

  @ApiProperty({
    type: String,
    description: '3차 지역',
    example: 'OO동',
    required: true,
  })
  @IsString()
  @IsOptional()
  readonly thirdCity: string;

  @ApiProperty({
    enum: MemberType,
    description: '회원 유형( N: 일반회원 normal user, P: 프로회원 pro user, A: 관리자 admin)',
    example: 'N',
    required: true,
  })
  @IsEnum(MemberType)
  @IsNotEmpty()
  readonly type: MemberType;

  @ApiProperty({
    type: () => Boolean,
    description: '광고 수신 동의 여부( true: 동의, false: 비동의 )',
    example: 'true',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isAgreeAD: boolean;

  @ApiProperty({
    type: () => Boolean,
    description: '알림 수신 동의 여부( true: 동의, false: 비동의 )',
    example: 'true',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly isAgreeAlarm: boolean;

  @ApiProperty({
    type: Array,
    description: '1차 디저트 카테고리 id 배열',
    example: '[1, 2, 3, 4]',
    required: true,
  })
  @IsArray()
  @IsOptional()
  readonly uidIdArr: number[];
}
