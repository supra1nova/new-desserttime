import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class ReviewIngredient {
  @PrimaryGeneratedColumn('uuid')
  reviewIngredientId: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.reviewIngredients)
  ingredient: Ingredient;

  @ManyToOne(() => Review, (review) => review.reviewIngredients)
  review: Review;
}
