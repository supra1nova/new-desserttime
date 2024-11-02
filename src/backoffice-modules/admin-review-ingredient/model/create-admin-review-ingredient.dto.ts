export class CreateAdminReviewIngredientDto  {
  constructor(ingredientId: number, reviewId: number) {
    this.ingredient = { ingredientId: ingredientId };
    this.review = { reviewId: reviewId };
  }

  readonly review: { reviewId: number };
  readonly ingredient: { ingredientId: number };
}
