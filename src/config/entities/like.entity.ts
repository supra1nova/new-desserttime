// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  Lid: number;

  @CreateDateColumn()
  createdDate: Date;
  
  @ManyToOne(()=>User, user => user.likes)
  user:User

  @ManyToOne(()=>Review, review => review.likes)
  review:Review
}
