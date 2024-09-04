import { IsBoolean, IsNumber } from 'class-validator';

export class DeleteAdminMemberDto {
  constructor(memberId: number, isUsable: boolean) {
    this.memberId = memberId;
    this.isUsable = isUsable;
  }

  @IsNumber()
  readonly memberId: number;

  @IsBoolean()
  readonly isUsable: boolean;
}
