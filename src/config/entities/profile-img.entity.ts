import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn, DeleteDateColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class ProfileImg {
  @PrimaryGeneratedColumn('uuid')
  profileImgId: string;

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
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @OneToOne(() => Member, (member) => member.profileImg)
  @JoinColumn()
  member: Member;
}
