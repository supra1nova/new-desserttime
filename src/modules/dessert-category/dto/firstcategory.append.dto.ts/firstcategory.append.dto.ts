import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FirstCategoryAppendDto{
    @ApiProperty({
        example: '1',
        description: '카테고리 차수 1차:1/ 2차:2/',
        required: true,
      })
      @IsNotEmpty()
      readonly sessionNum: number;
      @ApiProperty({
        example: '디저트명',
        description: '디저트명',
        required: true,
      })
      @IsNotEmpty()
      readonly dessertName: string;
    
}