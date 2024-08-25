import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReviewIngredient } from './review.ingredient.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  ingredientId: number;

  @Column()
  ingredientName: string;

  @Column({ default: true })
  usable: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @OneToMany(() => ReviewIngredient, (reviewIngredients) => reviewIngredients.ingredient)
  reviewIngredients: ReviewIngredient[];
}
