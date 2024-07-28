import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  Column,
  JoinColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { PointHistory } from './point.history.entity';

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

  @OneToMany(() => PointHistory, (pointHistory) => pointHistory.point)
  pointHistory: PointHistory;
}
