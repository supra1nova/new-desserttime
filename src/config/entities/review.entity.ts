import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Member } from './member.entity';
import { Accusation } from './accusation.entity';
import { Like } from './like.entity';
import { ReviewImg } from './review.img.entity';
import { DessertCategory } from './dessert.category.entity';
import { PointHistory } from './point.history.entity';
import { ReceiptImg } from './receipt.Img.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;

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

  @Column({ default: true }) //삭제여부
  isUsable: boolean;

  @Column({ default: false }) //승인여부
  isUpdated: boolean;

  @Column({ default: false }) //영수증 등록후 수정여부
  isInitalized: boolean;

  @Column({ default: 0 })
  point: number;

  @Column({ nullable: true })
  adminMemo: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(() => Accusation, (accusation) => accusation.review)
  accusations: Accusation[];

  @ManyToOne(() => Member, (member) => member.reviews)
  member: Member;

  @ManyToOne(
    () => DessertCategory,
    (dessertCategory) => dessertCategory.reviews,
  )
  dessertCategory: DessertCategory;

  @OneToMany(() => Like, (likes) => likes.review)
  likes: Like[];

  @OneToMany(() => ReviewImg, (rImg) => rImg.reviewImg)
  reviewImg: ReviewImg[];

  @OneToOne(() => PointHistory, (pointHistory) => pointHistory.review)
  pointHistory: PointHistory;

  @ManyToOne(() => ReceiptImg, (receiptImg) => receiptImg.review)
  receiptImg: ReceiptImg;
}
