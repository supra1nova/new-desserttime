import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateQnADto{
    @ApiProperty({
        example: 'dessert1@naver.com',
        description: '이메일',
        required: true,
      })
      @IsNotEmpty()
      readonly email: string;
    
      @ApiProperty({
        example: '문의 내용',
        description: '문의 내용',
        required: true,
      })
      @IsNotEmpty()
      readonly content: string;

}