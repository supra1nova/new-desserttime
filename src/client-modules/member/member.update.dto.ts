import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, Matches, IsOptional } from 'class-validator';

export class MemberUpdateDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: '사용자 id',
    required: true,
  })
  readonly memberId: number;

  @IsOptional()
  @ApiProperty({
    example: '1997',
    description: '출생년도',
    required: false,
  })
  readonly birthYear: number;

  @IsOptional()
  @ApiProperty({
    example: 'F:여/ M:남',
    description: '성별',
    required: false,
  })
  readonly gender: string;

  @IsOptional()
  @ApiProperty({
    example: '서울광역시',
    description: '첫 주소',
    required: false,
  })
  readonly firstCity: string;

  @IsOptional()
  @ApiProperty({
    example: '관악구',
    description: '두번째 주소',
    required: false,
  })
  readonly secondaryCity: string;

  @IsOptional()
  @ApiProperty({
    example: '신림동',
    description: '세번째 주소',
    required: false,
  })
  readonly thirdCity: string;

  @IsOptional()
  @ApiProperty({
    example: '불타는 고구마 냠 아뜨거',
    description: '닉네임',
    required: false,
  })
  readonly nickName: string;
}
