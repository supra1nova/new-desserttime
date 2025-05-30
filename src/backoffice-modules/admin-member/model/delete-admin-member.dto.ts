import { IsBoolean, IsNumber } from 'class-validator';

export class DeleteAdminMemberDto {
  constructor(memberId: string, isUsable: boolean) {
    this.memberId = memberId;
    this.isUsable = isUsable;
  }

  @IsNumber()
  readonly memberId: string;

  @IsBoolean()
  readonly isUsable: boolean;
}
