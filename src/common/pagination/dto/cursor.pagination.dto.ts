// pagination/dto/cursor-pagination.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class CursorPaginationDto {
  @ApiProperty({
    example: '30',
    description: '직전에 조회한 리스트의 마지막 id :: 처음 조회할때는 공백',
    required: false,
  })
  @IsOptional()
  readonly cursor?: number;

  @IsOptional()
  @Min(1)
  readonly limit: number = 30;
}
