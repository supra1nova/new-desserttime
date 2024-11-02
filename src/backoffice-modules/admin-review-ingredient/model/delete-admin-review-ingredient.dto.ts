export class DeleteAdminReviewIngredientDto {
  constructor(reviewId: number) {
    this.review = { reviewId: reviewId };
  }

  readonly review: { reviewId: number };
}
