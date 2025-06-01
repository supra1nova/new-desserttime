import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  DeleteDateColumn, JoinColumn,
} from 'typeorm';
import { UserInterestDessert } from './user-interest-dessert.entity';
import { Qna } from './qna.entity';
import { Review } from './review.entity';
import { Like } from './like.entity';
import { ProfileImg } from './profile-img.entity';
import { Accusation } from './accusation.entity';
import { Point } from './point.entity';
import { MemberType } from '../../common/enum/member.enum';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  memberId: string;

  @Column()
  snsId: string;

  @Column()
  signInSns: string;

  @Column()
  memberEmail: string;

  @Column()
  memberName: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  birthYear: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, default: false })
  isHavingImg: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastAccessDate: Date;

  @Column({ nullable: true })
  memo: string;

  @Column({ nullable: true, default: MemberType.NORMAL_USER })
  type: string;

  @Column({ nullable: true })
  firstCity: string;

  @Column({ nullable: true })
  secondaryCity: string;

  @Column({ nullable: true })
  thirdCity: string;

  @Column({ default: false })
  adStatus: boolean;

  @Column({ default: false })
  alarmStatus: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToOne(() => ProfileImg, (profileImg) => profileImg.member)
  @JoinColumn({ name: 'profile_img_id' })
  profileImg: ProfileImg;

  @OneToOne(() => Point, (point) => point.member)
  @JoinColumn({ name: 'point_id' })
  point: Point;

  @OneToMany(() => UserInterestDessert, (userInterestDessert) => userInterestDessert.member)
  userInterestDesserts: UserInterestDessert[];

  @OneToMany(() => Qna, (qna) => qna.member)
  qnas: Qna[];

  @OneToMany(() => Accusation, (accusation) => accusation.member)
  accusations: Accusation[];

  @OneToMany(() => Review, (reviews) => reviews.member)
  reviews: Review[];

  @OneToMany(() => Like, (likes) => likes.member)
  likes: Like[];
}
