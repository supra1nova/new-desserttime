import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Review } from './review.entity';
import { ReviewImg } from './review.img.entity';

@Entity()
export class MemberImg {
  @PrimaryGeneratedColumn()
  memberImgId: number;

  @Column()
  middlepath: string;

  @Column()
  path: string;

  @Column()
  extention: string;

  @Column()
  imgName: string;

  @Column({ nullable: true, default: true })
  isUsable: boolean;

  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => Member, (member) => member.img)
  @JoinColumn()
  member: Member;
}
