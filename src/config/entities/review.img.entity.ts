import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class ReviewImg {
  @PrimaryGeneratedColumn()
  reviewImgId: number;

  @Column()
  middlepath: string;

  @Column()
  path: string;

  @Column()
  extention: string;

  @Column()
  imgName: string;

  @Column({ default: false })
  isMain: boolean;

  @Column({ default: true })
  isUsable: boolean;

  @Column()
  num: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Review, (review) => review.reviewImg)
  reviewImg: Review;
}
