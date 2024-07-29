import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  pointId: number;

  @Column()
  totalPoint: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToOne(() => Member, (member) => member.point)
  @JoinColumn()
  member: Member;
}
