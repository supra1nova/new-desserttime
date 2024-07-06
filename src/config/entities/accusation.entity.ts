import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';

@Entity()
export class Accusation {
  @PrimaryGeneratedColumn()
  accusationId: number;

  @Column()
  reason:string;

  @Column({nullable:true})
  content: string;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(()=>Member, member => member.accusations)
  member:Member

  @ManyToOne(()=>Review, review => review.accusations)
  review:Review
}
