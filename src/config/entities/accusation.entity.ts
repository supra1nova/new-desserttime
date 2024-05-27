// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity()
export class Accusation {
  @PrimaryGeneratedColumn()
  Aid: number;

  @Column()
  content: string;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(()=>User, user => user.qna)
  user:User

  @ManyToOne(()=>Review, review => review.accusations)
  review:Review
}
