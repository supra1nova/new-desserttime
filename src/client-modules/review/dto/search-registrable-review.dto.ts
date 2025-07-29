import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CursorPaginationDto } from 'src/common/pagination/dto/cursor.pagination.dto';

export class SearchRegistrableReview extends CursorPaginationDto {
  @ApiProperty({
    example: 'aaaa',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: string;
}
