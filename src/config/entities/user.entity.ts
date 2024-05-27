// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { UserInterestDessert } from './user.interest.dessert.entity';
import { QnA } from './qna.entity';
import { Review } from './review.entity';
import { Like } from './like.entity';
import { Point } from './point.entity';
import { Img } from './img.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

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

  @OneToMany(()=>UserInterestDessert, udi => udi.user)
  uids:UserInterestDessert[];

  @OneToMany(()=>QnA, qna=>qna.user)
  qnas:QnA[];

  @OneToMany(()=>Review, reviews => reviews.user)
  reviews:Review[];

  @OneToMany(()=>Like, likes => likes.user)
  likes:Like[];

  @OneToMany(()=>Point,points=>points.user)
  points:Point[];
  
  @OneToOne(()=>Img, img => img.user)
  img:Img
}
