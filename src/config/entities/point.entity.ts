import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, Column, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn('uuid')
  pointId: string;

  @Column()
  totalPoint: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToOne(() => Member, (member) => member.point)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
