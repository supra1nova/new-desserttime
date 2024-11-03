export class CreateAdminReviewIngredientDto {
  constructor(reviewId: number, ingredientId: number) {
    this.review = { reviewId: reviewId };
    this.ingredient = { ingredientId: ingredientId };
  }

  readonly review: { reviewId: number };
  readonly ingredient: { ingredientId: number };
}
