import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserValidationDto {
  @ApiProperty({
    example: '각sns에서 제공해주는 사용자 식별값',
    description: '식별값',
    required: true,
  })
  @IsNotEmpty()
  readonly snsId: string;
}
