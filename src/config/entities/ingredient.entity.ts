import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ReviewIngredient } from './review-ingredient.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  ingredientId: string;

  @Column()
  ingredientName: string;

  @Column({ default: true })
  usable: boolean;

  @CreateDateColumn()
  createDate: Date;

  @OneToMany(() => ReviewIngredient, (reviewIngredients) => reviewIngredients.ingredient)
  reviewIngredients: ReviewIngredient[];
}
