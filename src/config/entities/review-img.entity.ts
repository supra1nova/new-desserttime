import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class ReviewImg {
  @PrimaryGeneratedColumn('uuid')
  reviewImgId: string;

  @Column()
  middlePath: string;

  @Column()
  path: string;

  @Column()
  extension: string;

  @Column()
  imgName: string;

  @Column({ default: false })
  isMain: boolean;

  @Column()
  num: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @ManyToOne(() => Review, (review) => review.reviewImgs)
  reviewImg: Review;
}
