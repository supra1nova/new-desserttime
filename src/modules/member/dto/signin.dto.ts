import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';

export class SignInDto {

//   @ApiProperty({
//     example: 'jiminjeong1',
//     description: '훈련자 id',
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsString()
//   @Length(5, 20)
//   @Matches(/^(?=.*[a-z])(?=.*[0-9])(?!.*\s)(?!.*\W)(?!.*_).{5,20}$/)
//   readonly userId: string;

//   @ApiProperty({
//     example: 'jiminjeong1',
//     description: '훈련자 pw',
//     required: false,
//   })
//   @Length(8)
//   @Matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)
//   @IsOptional()
//   readonly userPw: string;

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
  readonly memberId: string;

  @ApiProperty({
    example: 'naver/google/kakao/apple',
    description: '도메인',
    required: true,
  })
  @IsNotEmpty()
  readonly memberDomain: string;

  @ApiProperty({
    example: '1997',
    description: '출생년도',
    required: true,
  })
  @IsNotEmpty()
  readonly memberBirth: number;

  @ApiProperty({
    example: 'F:여/ M:남',
    description: '성별',
    required: true,
  })
  @IsNotEmpty()
  readonly memberGender: string;

  @ApiProperty({
    example: '서울광역시 신림동',
    description: '주소',
    required: true,
  })
  @IsNotEmpty()
  readonly memberAddress: string;

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
    required: true,
  })
  @IsNotEmpty()
  readonly memberPickCategory1: number;

  @ApiProperty({
    example: 2,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly memberPickCategory2: number;

  @ApiProperty({
    example: 3,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly memberPickCategory3: number;

  @ApiProperty({
    example: 4,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly memberPickCategory4: number;

  @ApiProperty({
    example: 5,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly memberPickCategory5: number;
}
