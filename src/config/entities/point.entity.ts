import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Member } from './member.entity';
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

  // @ManyToOne(()=>Member, member => member.points)
  // member:Member

  // @ManyToOne(()=>Review, review => review.points)
  // review:Review
}
