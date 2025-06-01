import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRegistrableReviewDto {
  @ApiProperty({
    example: '1',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: string;

  @ApiProperty({
    example: '온혜화',
    description: '가게명',
    required: true,
  })
  @IsNotEmpty()
  readonly storeName: string;

  @ApiProperty({
    example: '["치츠케이꾸","찰떡빙수","진동벨"]',
    description: '메뉴명 list',
    required: true,
  })
  @IsNotEmpty()
  readonly menuNames: string[];
}
