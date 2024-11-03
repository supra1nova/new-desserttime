import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';
import { PointType } from '../../common/enum/point.enum';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  pointHistoryId: number;

  @Column()
  newPoint: number;

  @Column({ nullable: true, default: PointType.REVIEW })
  pointType: PointType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Member, (member) => member.likes)
  member: Member;

  @OneToOne(() => Review, (review) => review.pointHistory)
  @JoinColumn()
  review: Review;
}
