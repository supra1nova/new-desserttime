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
import { PointTotalCount } from './point.total.count.entity';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  pointHisotryId: number;

  @Column()
  pointCount: number;

  @Column()
  menuName: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Member, (member) => member.likes)
  member: Member;

  @ManyToOne(
    () => PointTotalCount,
    (pointTotalCount) => pointTotalCount.potinHistory,
  )
  pointTotalCount: PointTotalCount;

  @OneToOne(() => Review, (review) => review.pointHistory)
  review: Review;
}
