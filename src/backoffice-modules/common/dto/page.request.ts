import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

const DEFAULT_LIMIT_SIZE = 10;

export class PageRequest {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: '페이지 번호',
    required: false,
  })
  pageNo?: number | 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: '한 페이지에 로드할 최대 게시물 수량',
    required: false,
  })
  limitSize?: number | 10;

  /**
   * db 조회시 사용할 offset 값 조회
   * @returns number
   */
  getSkip(): number {
    if (this.pageNo < 1 || this.pageNo === null || this.pageNo === undefined) {
      this.pageNo = 1;
    }

    if (this.limitSize < 1 || this.limitSize === null || this.limitSize === undefined) {
      this.limitSize = DEFAULT_LIMIT_SIZE;
    }

    return (Number(this.pageNo) - 1) * Number(this.limitSize);
  }

  /**
   * db 조회시 사용할 take 값 조회
   * @returns number
   */
  getTake(): number {
    if (this.limitSize < 1 || this.limitSize === null || this.limitSize === undefined) {
      this.limitSize = DEFAULT_LIMIT_SIZE;
    }
    return Number(this.limitSize);
  }
}
