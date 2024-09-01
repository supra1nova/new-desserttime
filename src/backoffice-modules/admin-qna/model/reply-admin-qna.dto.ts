import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReplyAdminQnaDto {
  @ApiProperty({
    example: 'qna 답변 본문',
    description: 'qna 답변 본문',
    required: true,
  })
  @IsOptional()
  @IsString()
  readonly replyContent: string;

  @ApiProperty({
    type: () => Number,
    example: '1',
    description: '답변 admin member id',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  readonly replyAdminId: number;
}
