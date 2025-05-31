import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Accusation } from './accusation.entity';
import { Like } from './like.entity';
import { ReviewImg } from './review-img.entity';
import { DessertCategory } from './dessert-category.entity';
import { PointHistory } from './point-history.entity';
import { ReceiptImg } from './receipt-img.entity';
import { ReviewIngredient } from './review-ingredient.entity';
import { ReviewStatus } from '../../common/enum/review.enum';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  reviewId: string;

  @Column({ default: 0 })
  totalLikedNum: number;

  @Column({ nullable: true })
  content: string;

  @Column()
  menuName: string;

  @Column()
  storeName: string;

  @Column({ nullable: true })
  score: number;

  @Column({ default: true }) //삭제여부
  isUsable: boolean;

  @Column({ default: false }) //승인여부
  isUpdated: boolean;

  @Column({ default: false }) //영수증 등록후 최초 수정여부
  isInitialized: boolean;

  @Column({ default: false }) //영수증 등록후 작성완료여부
  isSaved: boolean;

  @Column({ default: 0 })
  point: number;

  @Column({ nullable: true })
  adminMemo: string;

  @Column({ default: ReviewStatus.WAIT })
  status: ReviewStatus;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToMany(() => Accusation, (accusation) => accusation.review)
  accusations: Accusation[];

  @ManyToOne(() => Member, (member) => member.reviews)
  member: Member;

  @ManyToOne(() => DessertCategory, (dessertCategory) => dessertCategory.reviews)
  dessertCategory: DessertCategory;

  @OneToMany(() => Like, (likes) => likes.review)
  likes: Like[];

  @OneToMany(() => ReviewImg, (reviewImg) => reviewImg.reviewImg)
  reviewImgs: ReviewImg[];

  @OneToOne(() => PointHistory, (pointHistory) => pointHistory.review)
  pointHistory: PointHistory;

  @ManyToOne(() => ReceiptImg, (receiptImg) => receiptImg.review)
  receiptImg: ReceiptImg;

  @OneToMany(() => ReviewIngredient, (reviewIngredients) => reviewIngredients.review)
  reviewIngredients: ReviewIngredient[];
}
