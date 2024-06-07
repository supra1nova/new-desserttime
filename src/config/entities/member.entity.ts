import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { UserInterestDessert } from './user.interest.dessert.entity';
import { QnA } from './qna.entity';
import { Review } from './review.entity';
import { Like } from './like.entity';
import { Point } from './point.entity';
import { Img } from './img.entity';
import { Accusation } from './accusation.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  memberName: string;

  @Column()
  nickName: string;

  @Column()
  birthday: Date;

  @Column()
  gender: string;
  
  @Column()
  email: string;
  
  @Column()
  isHavingImg: boolean;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;
  
  @Column()
  address: string;

  @Column()
  isAgreeLocation:boolean

  @Column()
  isAgreeAD:boolean

  @Column()
  domain:string

  @OneToMany(()=>UserInterestDessert, udi => udi.member)
  uids:UserInterestDessert[];

  @OneToMany(()=>QnA, qna=>qna.member)
  qnas:QnA[];

  @OneToMany(()=>Accusation, accusation => accusation.member)
  accusations:Accusation[]

  @OneToMany(()=>Review, reviews => reviews.member)
  reviews:Review[];

  @OneToMany(()=>Like, likes => likes.member)
  likes:Like[];

  @OneToMany(()=>Point,points=>points.member)
  points:Point[];
  
  @OneToOne(()=>Img, img => img.member)
  img:Img
}
