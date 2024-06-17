import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { UserInterestDessert } from './user.interest.dessert.entity';
// import { QnA } from './qna.entity';
import { Review } from './review.entity';
import { Like } from './like.entity';
import { Point } from './point.entity';
import { Img } from './img.entity';
import { Accusation } from './accusation.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  MId: number;

  @Column()
  memberId: string;

  @Column()
  memberName: string;

  @Column({nullable:true})
  nickName: string;

  @Column()
  birth: number;

  @Column()
  gender: string;
  
  @Column()
  email: string;
  
  @Column({nullable:true,default:false})
  isHavingImg: boolean;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;
  
  @Column()
  address: string;

  // @Column()
  // isAgreeLocation:boolean

  @Column()
  isAgreeAD:boolean

  @Column()
  domain:string

  @OneToMany(()=>UserInterestDessert, udi => udi.member)
  uids:UserInterestDessert[];

  // @OneToMany(()=>QnA, qna=>qna.member)
  // qnas:QnA[];

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
