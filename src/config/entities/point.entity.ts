// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  Pid: number;

  @Column()
  count: number;

  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(()=>User, user => user.points)
  user:User

  @ManyToOne(()=>Review, review => review.points)
  review:Review
}
