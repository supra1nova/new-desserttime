import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';
import { Point } from './point.entity';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  pointHistoryId: number;

  @Column()
  newPoint: number;

  @Column()
  menuName: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Member, (member) => member.likes)
  member: Member;

  @ManyToOne(() => Point, (pointTotalCount) => pointTotalCount.pointHistory)
  point: Point;

  @OneToOne(() => Review, (review) => review.pointHistory)
  review: Review;
}
