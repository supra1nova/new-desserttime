import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, DeleteDateColumn, JoinColumn,
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
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => DessertCategory, (dessertCategory) => dessertCategory.userInterestDesserts)
  @JoinColumn({ name: 'dessert_category_id' })
  dessertCategory: DessertCategory;
}
