import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PointType } from '../../../common/enum/point.enum';

export class UpdateAdminPointDto {
  constructor(newPoint: number, pointType: PointType) {
    this.newPoint = newPoint;
    this.pointType = pointType;
  }

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

  toSavePointDto() {
    let resultPoint = this.newPoint;
    if (isNaN(this.newPoint) || this.newPoint === null || this.newPoint === undefined) resultPoint = 0;

    return new UpdateAdminPointDto(resultPoint, this.pointType);
  }

  toRecallPointDto() {
    let resultPoint = this.newPoint;
    if (isNaN(this.newPoint) || this.newPoint === null || this.newPoint === undefined) resultPoint = 0;
    if (resultPoint > 0) resultPoint *= -1;

    return new UpdateAdminPointDto(resultPoint, this.pointType);
  }
}
