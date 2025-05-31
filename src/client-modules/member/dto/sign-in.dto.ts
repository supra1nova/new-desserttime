import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, Matches, IsOptional } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: '김디저트',
    description: '회원 명',
    required: true,
  })
  @IsNotEmpty()
  readonly memberName: string;

  @ApiProperty({
    example: 'dessert1@naver.com',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty()
  readonly memberEmail: string;

  @ApiProperty({
    example: '각sns에서 제공해주는 사용자 식별값',
    description: '식별값',
    required: true,
  })
  @IsNotEmpty()
  readonly snsId: string;

  @ApiProperty({
    example: 'naver/google/kakao/apple',
    description: '등록한 sns 도메인',
    required: false,
  })
  @IsNotEmpty()
  readonly signInSns: string;

  @ApiProperty({
    example: '1997',
    description: '출생년도',
    required: false,
  })
  readonly birthYear: number;

  @ApiProperty({
    example: 'F:여/ M:남',
    description: '성별',
    required: false,
  })
  readonly memberGender: string;

  @ApiProperty({
    example: '서울광역시',
    description: '첫 주소',
    required: false,
  })
  readonly firstCity: string;

  @ApiProperty({
    example: '관악구',
    description: '두번째 주소',
    required: false,
  })
  readonly secondaryCity: string;

  @ApiProperty({
    example: '신림동',
    description: '세번째 주소',
    required: false,
  })
  readonly thirdCity: string;

  @ApiProperty({
    example: '사용자 마케팅 광고 약관동의 여부  - N / Y',
    description: '사용자 마케팅 광고 약관동의 여부',
    required: true,
  })
  @IsNotEmpty()
  readonly isAgreeAD: boolean;

  @ApiProperty({
    example: 1,
    description: '사용자가 선택한 디저트카테고리',
    required: false,
  })
  readonly memberPickCategory1: number;

  @ApiProperty({
    example: 2,
    description: '사용자가 선택한 디저트카테고리',
    required: false,
  })
  readonly memberPickCategory2: number;

  @ApiProperty({
    example: 3,
    description: '사용자가 선택한 디저트카테고리',
    required: false,
  })
  readonly memberPickCategory3: number;

  @ApiProperty({
    example: 4,
    description: '사용자가 선택한 디저트카테고리',
    required: false,
  })
  readonly memberPickCategory4: number;

  @ApiProperty({
    example: 5,
    description: '사용자가 선택한 디저트카테고리',
    required: false,
  })
  readonly memberPickCategory5: number;
}
