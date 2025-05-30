export class CreateAdminReviewIngredientDto {
  constructor(reviewId: string, ingredientId: string) {
    this.review = { reviewId: reviewId };
    this.ingredient = { ingredientId: ingredientId };
  }

  readonly review: { reviewId: string };
  readonly ingredient: { ingredientId: string };
}
