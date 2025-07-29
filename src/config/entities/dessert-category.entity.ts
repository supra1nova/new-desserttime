import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { UserInterestDessert } from './user-interest-dessert.entity';
import { Review } from './review.entity';

@Entity()
export class DessertCategory {
  @PrimaryGeneratedColumn('uuid')
  dessertCategoryId: string;

  @Column()
  dessertName: string;

  @Column({ default: 0 })
  parentDCId: number;

  @Column()
  sessionNum: number;

  @Column()
  sortNum: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => UserInterestDessert, (userInterestDessert) => userInterestDessert.dessertCategory)
  userInterestDesserts: UserInterestDessert[];

  @OneToMany(() => Review, (review) => review.dessertCategory)
  reviews: Review[];
}
