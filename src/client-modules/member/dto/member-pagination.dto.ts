import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CursorPaginationDto } from 'src/common/pagination/dto/cursor.pagination.dto';

export class MemberPaginationDto extends CursorPaginationDto {
  @ApiProperty({
    example: '1',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: string;
}
