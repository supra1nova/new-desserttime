import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class MemberAlarmDto {
  @ApiProperty({
    example: '1',
    description: '사용자 Id',
    required: true,
  })
  @IsNotEmpty()
  readonly memberId: string;

  @Transform((value) => {
    return value.value == 'true' ? true : false;
  })
  @ApiProperty({
    example: '수싣 :true/ 비수신:false',
    description: '알람 수신상태',
    required: true,
  })
  @IsNotEmpty()
  readonly alarmStatus: boolean;
}
