import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Member } from './member.entity';
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
