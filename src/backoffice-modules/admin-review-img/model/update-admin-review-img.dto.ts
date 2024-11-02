import { ReviewStatus } from '../../common/enum/review.enum';

export class UpdateAdminReviewImgDto {
  constructor(num: number, isMain: boolean, isUsable: boolean) {
    this.num = num;
    this.isMain = isMain
    this.isUsable = isUsable;
  }

  readonly num: number;
  readonly isMain: boolean;
  readonly isUsable: boolean;
  readonly status: ReviewStatus;
}
