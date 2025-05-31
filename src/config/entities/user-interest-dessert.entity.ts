import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, DeleteDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { DessertCategory } from './dessert-category.entity';

@Entity()
export class UserInterestDessert {
  @PrimaryGeneratedColumn('uuid')
  userInterestId: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Member, (member) => member.userInterestDesserts)
  member: Member;

  @ManyToOne(() => DessertCategory, (dessertCategory) => dessertCategory.userInterestDesserts)
  dessertCategory: DessertCategory;
}
