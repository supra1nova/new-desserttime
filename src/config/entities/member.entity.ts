import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { UserInterestDessert } from './user.interest.dessert.entity';
import { QnA } from './qna.entity';
import { Review } from './review.entity';
import { Like } from './like.entity';
import { ProfileImg } from './profile.img.entity';
import { Accusation } from './accusation.entity';
import { Point } from './point.entity';
import { MemberTypeEnum } from '../../backoffice-modules/admin-member/model/member.enum';
import { MemberDeleteion } from './member.deleteion.entity';

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

  @Column({ nullable: true })
  birthYear: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, default: false })
  isHavingImg: boolean;

  @Column({ nullable: true, default: true })
  isUsable: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastAccessDate: Date;

  @Column({ nullable: true })
  memo: string;

  @Column({ nullable: true, default: MemberTypeEnum.NORMAL_USER })
  type: string;

  @Column({ nullable: true })
  firstCity: string;

  @Column({ nullable: true })
  secondaryCity: string;

  @Column({ nullable: true })
  thirdCity: string;

  @Column({ default: false })
  isAgreeAD: boolean;

  @Column({ default: false })
  isAgreeAlarm: boolean;

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

  @OneToOne(() => ProfileImg, (profileImg) => profileImg.member)
  profileImg: ProfileImg;

  @OneToOne(() => Point, (point) => point.member)
  point: Point;

  @OneToOne(() => MemberDeleteion, (memberDeletion) => memberDeletion.member)
  memberDeletion: MemberDeleteion;
}
