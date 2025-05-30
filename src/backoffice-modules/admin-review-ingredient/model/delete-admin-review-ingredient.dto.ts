export class DeleteAdminReviewIngredientDto {
  constructor(reviewId: string) {
    this.review = { reviewId: reviewId };
  }

  readonly review: { reviewId: string };
}
