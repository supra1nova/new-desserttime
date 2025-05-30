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
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => Member, (member) => member.profileImg)
  @JoinColumn()
  member: Member;
}
