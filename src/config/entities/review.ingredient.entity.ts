import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Review } from './review.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class ReviewIngredient {
  @PrimaryGeneratedColumn()
  reviewIngredientId: number;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.reviewIngredients)
  ingredient: Ingredient;

  @ManyToOne(() => Review, (review) => review.reviewIngredients)
  review: Review;
}
