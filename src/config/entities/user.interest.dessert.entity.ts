import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Member } from './member.entity';
import { DessertCategory } from './dessert.category.entity';

@Entity()
export class UserInterestDessert {
  @PrimaryGeneratedColumn()
  UIDid: number;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(()=>Member, member=>member.uids)
  member:Member;
  @ManyToOne(()=>DessertCategory, dc=>dc.uid)
  dc:DessertCategory
  
}
