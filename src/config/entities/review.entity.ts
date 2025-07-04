import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  DeleteDateColumn, JoinColumn,
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

  @OneToOne(() => PointHistory, (pointHistory) => pointHistory.review)
  @JoinColumn({ name: 'point_history_id' })
  pointHistory: PointHistory;

  @ManyToOne(() => Member, (member) => member.reviews)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => DessertCategory, (dessertCategory) => dessertCategory.reviews)
  @JoinColumn({ name: 'dessert_category_id' })
  dessertCategory: DessertCategory;

  @ManyToOne(() => ReceiptImg, (receiptImg) => receiptImg.review)
  @JoinColumn({ name: 'receipt_img_id' })
  receiptImg: ReceiptImg;

  @OneToMany(() => ReviewIngredient, (reviewIngredients) => reviewIngredients.review)
  reviewIngredients: ReviewIngredient[];

  @OneToMany(() => Accusation, (accusation) => accusation.review)
  accusations: Accusation[];

  @OneToMany(() => Like, (likes) => likes.review)
  likes: Like[];

  @OneToMany(() => ReviewImg, (reviewImg) => reviewImg.reviewImg)
  reviewImgs: ReviewImg[];
}
