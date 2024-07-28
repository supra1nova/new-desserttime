import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class MemberImg {
  @PrimaryGeneratedColumn()
  memberImgId: number;

  @Column()
  middlePath: string;

  @Column()
  path: string;

  @Column()
  extension: string;

  @Column()
  imgName: string;

  @Column({ nullable: false, default: true })
  isUsable: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => Member, (member) => member.img)
  @JoinColumn()
  member: Member;
}
