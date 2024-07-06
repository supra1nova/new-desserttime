import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class QnA {
  @PrimaryGeneratedColumn()
  qnaId: number;

  @Column({nullable:true})
  email: string;

  @Column()
  content: string;

  @Column({default:false})
  isAnswered:boolean;

  @Column({default:true})
  isUsable:boolean;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(()=>Member, member => member.qnas)
  member:Member
}
