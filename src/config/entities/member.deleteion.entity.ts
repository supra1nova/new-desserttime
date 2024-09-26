import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class MemberDeleteion {
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

  @OneToOne(() => Member, (member) => member.memberDeletion)
  member: Member;
}
