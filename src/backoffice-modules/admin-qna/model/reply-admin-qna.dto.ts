import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ReplyAdminQnaDto {
  @ApiProperty({
    description: 'qna 답변 본문',
    example: 'qna 답변 본문',
    required: true,
  })
  @IsString()
  readonly replyContent: string;

  @ApiProperty({
    readOnly: true,
    description: '답변 admin member id',
    example: '1',
    required: false,
    default: '1',
  })
  @IsString()
  @IsOptional()
  readonly replyAdminId?: string;
}
