import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PointType } from '../../common/enum/point.enum';

export class UpdateAdminPointDto {
  @ApiProperty({
    description: '적립 추가/회수 포인트( 양/음수 가능 )',
    example: '10',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly newPoint: number;

  @ApiProperty({
    description: '지급/회수 포인트 유형( R: 리뷰 통해 적립되는 포인트, A: admin 지급/회수 포인트)',
    example: 'A',
    required: false,
  })
  @IsEnum(PointType)
  @IsNotEmpty()
  readonly pointType: PointType;
}
