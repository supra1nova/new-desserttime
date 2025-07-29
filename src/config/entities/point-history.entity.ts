import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';
import { PointType } from '../../common/enum/point.enum';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn('uuid')
  pointHistoryId: string;

  @Column()
  newPoint: number;

  @Column({ nullable: true, default: PointType.REVIEW })
  pointType: PointType;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Member, (member) => member.likes)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @OneToOne(() => Review, (review) => review.pointHistory)
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
