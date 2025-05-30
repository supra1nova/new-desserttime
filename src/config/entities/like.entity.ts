import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  likeId: string;

  @CreateDateColumn()
  createdDate: Date;
  
  @ManyToOne(()=>Member, member => member.likes)
  member:Member

  @ManyToOne(()=>Review, review => review.likes)
  review:Review
}
