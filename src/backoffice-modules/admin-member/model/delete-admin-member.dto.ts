import { IsString } from 'class-validator';

export class DeleteAdminMemberDto {
  @IsString()
  readonly memberId: string;
}
