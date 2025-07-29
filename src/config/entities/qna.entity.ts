import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Qna {
  @PrimaryGeneratedColumn('uuid')
  qnaId: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  replyContent: string;

  @Column({ default: false })
  isAnswered: boolean;

  @Column({ default: true })
  isUsable: boolean;

  @CreateDateColumn({ nullable: false })
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @Column({ nullable: true })
  replyAdminId: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  replyCreateDate: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  replyUpdateDate: Date;

  @ManyToOne(() => Member, (member) => member.qnas)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
