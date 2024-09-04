import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReplyAdminQnaDto {
  @ApiProperty({
    description: 'qna 답변 본문',
    example: 'qna 답변 본문',
    required: true,
  })
  @IsOptional()
  @IsString()
  readonly replyContent: string;

  @ApiProperty({
    readOnly: true,
    type: () => Number,
    description: '답변 admin member id',
    example: '1',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  readonly replyAdminId?: number | 1;
}
