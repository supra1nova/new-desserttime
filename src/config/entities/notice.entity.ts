// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';
import { ReviewImg } from './review.img.entity';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  NId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  isNotice:boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate:Date;
}