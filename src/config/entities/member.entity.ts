import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserInterestDessert } from './user.interest.dessert.entity';
import { QnA } from './qna.entity';
import { Review } from './review.entity';
import { Like } from './like.entity';
import { MemberImg } from './member.img.entity';
import { Accusation } from './accusation.entity';
import { PointTotalCount } from './point.total.count.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  memberId: number;

  @Column()
  snsId: string;

  @Column()
  signInSns: string;

  @Column()
  memberEmail: string;

  @Column()
  memberName: string;

  @Column({ nullable: true })
  nickName: string;

  @Column()
  birthYear: number;

  @Column()
  gender: string;

  @Column({ nullable: true, default: false })
  isHavingImg: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // @Column({ nullable: true })
  // lastAccessDate: Date;

  @Column()
  firstCity: string;

  @Column()
  secondaryCity: string;

  @Column()
  thirdCity: string;

  @Column()
  isAgreeAD: boolean;

  @OneToMany(() => UserInterestDessert, (udi) => udi.member)
  uids: UserInterestDessert[];

  @OneToMany(() => QnA, (qna) => qna.member)
  qnas: QnA[];

  @OneToMany(() => Accusation, (accusation) => accusation.member)
  accusations: Accusation[];

  @OneToMany(() => Review, (reviews) => reviews.member)
  reviews: Review[];

  @OneToMany(() => Like, (likes) => likes.member)
  likes: Like[];

  @OneToOne(() => MemberImg, (img) => img.member)
  img: MemberImg;

  @OneToOne(() => PointTotalCount, (pointTotalCount) => pointTotalCount.member)
  pointTotalCount: PointTotalCount;
}
