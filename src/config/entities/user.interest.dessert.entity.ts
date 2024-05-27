// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { DessertCategory } from './dessert.category.entity';

@Entity()
export class UserInterestDessert {
  @PrimaryGeneratedColumn()
  UIDid: number;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(()=>User, user=>user.uids)
  user:User;
  @ManyToOne(()=>DessertCategory, dc=>dc.uid)
  dc:DessertCategory
  
}
