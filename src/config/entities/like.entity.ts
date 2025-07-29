import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  likeId: string;

  @ManyToOne(() => Member, (member) => member.likes)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Review, (review) => review.likes)
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
