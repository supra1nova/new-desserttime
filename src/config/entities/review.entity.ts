import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Member } from './member.entity';
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
  
  @OneToMany(()=>Accusation, accusation => accusation.review)
  accusations:Accusation[]

  @ManyToOne(()=>Member,member=>member.reviews)
  member:Member

  @OneToMany(()=>Like, likes => likes.review)
  likes:Like[]

  @OneToMany(()=>Point,points=>points.review)
  points:Point[];

  @OneToMany(()=>ReviewImg, rImg => rImg.img)
  rImg:ReviewImg[]
}
