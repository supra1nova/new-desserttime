import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    example: 'dessert1@naver.com',
    description: 'e-mail',
    required: true,
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsNotEmpty()
  readonly password: string;
}
