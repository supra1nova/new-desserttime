import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';
import { PointHistory } from './point.history.entity';

@Entity()
export class PointTotalCount {
  @PrimaryGeneratedColumn()
  ptcId: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToOne(() => Member, (member) => member.pointTotalCount)
  member: Member;

  @OneToMany(() => PointHistory, (pointHistory) => pointHistory.pointTotalCount)
  potinHistory: PointHistory;
}
