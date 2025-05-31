import { NoticeType } from 'src/common/enum/noticetype.enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn('uuid')
  noticeId: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: true })
  isNotice: boolean;

  @Column({ default: NoticeType.NOTICE })
  noticeType: string;

  @Column({ default: false })
  isTopFixed: boolean;

  @Column({ default: true })
  isUsable: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
