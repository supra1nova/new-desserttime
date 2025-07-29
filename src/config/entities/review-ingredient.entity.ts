import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @ManyToOne(() => Review, (review) => review.reviewIngredients)
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
