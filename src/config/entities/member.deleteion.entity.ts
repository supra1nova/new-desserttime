import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class MemberDeletion {
  @PrimaryGeneratedColumn()
  memberDeletionId: number;

  @Column()
  reason: string;

  @Column({ nullable: true })
  content: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  memberId: number;

  @OneToOne(() => Member, (member) => member.memberDeletion)
  member: Member;
}
