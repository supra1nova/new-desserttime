import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ParentIdDto {
  @ApiProperty({
    example: '1',
    description: '부모 차수 ID',
    required: true,
  })
  @IsNotEmpty()
  readonly parentDCId: number;
}
