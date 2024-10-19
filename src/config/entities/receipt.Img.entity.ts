import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class ReceiptImg {
  @PrimaryGeneratedColumn()
  receiptImgId: number;

  @Column()
  middlepath: string;

  @Column()
  path: string;

  @Column()
  extention: string;

  @Column()
  imgName: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(() => Review, (review) => review.receiptImg)
  review: Review[];
}
