import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';

@Entity()
export class Accusation {
  @PrimaryGeneratedColumn('uuid')
  accusationId: string;

  @Column()
  reason:string;

  @Column({nullable:true})
  content: string;
  
  @CreateDateColumn()
  createDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(()=>Member, member => member.accusations)
  member:Member

  @ManyToOne(()=>Review, review => review.accusations)
  review:Review
}
