export class DeleteDto {
  noticeId: number;
  isDeleted: boolean;

  constructor(noticeId: number, isDeleted: boolean) {
    this.noticeId = noticeId;
    this.isDeleted = isDeleted;
  }
}