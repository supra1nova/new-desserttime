import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class QnA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true})
  email: string;

  @Column()
  content: string;
  
  @Column()
  usable:boolean
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(()=>Member, member => member.qnas)
  member:Member
}
