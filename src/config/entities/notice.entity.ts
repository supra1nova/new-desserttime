import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  NId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  isNotice:boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate:Date;
}