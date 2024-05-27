// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserInterestDessert } from './user.interest.dessert.entity';
import { QnA } from './qna.entity';
import { User } from './user.entity';
import { Accusation } from './accusation.entity';
import { Like } from './like.entity';
import { Point } from './point.entity';
import { ReviewImg } from './review.img.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  Rid: number;

  @Column()
  totalLikedNum: number;

  @Column()
  content: string;

  @Column()
  menuName: string;

  @Column()
  storeName: string;
  
  @Column()
  score: number;
  
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;
  
  @OneToMany(()=>Accusation, accusation => accusation.user)
  accusations:Accusation[]

  @ManyToOne(()=>User,user=>user.reviews)
  user:User

  @OneToMany(()=>Like, likes => likes.user)
  likes:Like[]

  @OneToMany(()=>Point,points=>points.user)
  points:Point[];

  @OneToMany(()=>ReviewImg, rImg => rImg.img)
  rImg:ReviewImg[]
}
