import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto{

    @ApiProperty({
        example: 'dessert1@naver.com',
        description: '이메일',
        required: true,
      })
      @IsNotEmpty()
      readonly memberEmail: string;
    
      @ApiProperty({
        example: '각sns에서 제공해주는 사용자 식별값',
        description: '식별값',
        required: true,
      })
      @IsNotEmpty()
      readonly snsId: string;
    
}