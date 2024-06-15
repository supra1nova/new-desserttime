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
    description: '훈련자 명',
    required: true,
  })
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({
    example: 'naver/google/kakao/apple',
    description: '도메인',
    required: true,
  })
  @IsNotEmpty()
  readonly userDomain: string;

  @ApiProperty({
    example: '1997',
    description: '출생년도',
    required: true,
  })
  @IsNotEmpty()
  readonly userBirth: number;

  @ApiProperty({
    example: 'F:여/ M:남',
    description: '성별',
    required: true,
  })
  @IsNotEmpty()
  readonly userGender: string;

  @ApiProperty({
    example: '서울광역시 신림동',
    description: '주소',
    required: true,
  })
  @IsNotEmpty()
  readonly userAddress: string;

  @ApiProperty({
    example: 'Y',
    description: '사용자 약관동의 필수1',
    required: true,
  })
  @IsNotEmpty()
  readonly userTerms1: string;

  @ApiProperty({
    example: 'Y',
    description: '사용자 약관 동의 필수2',
    required: true,
  })
  @IsNotEmpty()
  readonly userTerms2: number;

  @ApiProperty({
    example: 'N / Y',
    description: '사용자 약관동의 선택1',
    required: true,
  })
  @IsNotEmpty()
  readonly userTerms3: string;

  @ApiProperty({
    example: 1,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly usersPickCategory1: number;

  @ApiProperty({
    example: 2,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly usersPickCategory2: number;

  @ApiProperty({
    example: 3,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly usersPickCategory3: number;

  @ApiProperty({
    example: 4,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly usersPickCategory4: number;

  @ApiProperty({
    example: 5,
    description: '사용자가 선택한 디저트카테고리',
    required: true,
  })
  @IsNotEmpty()
  readonly usersPickCategory5: number;
}
