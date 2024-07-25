import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Module } from './module.entity';
import { User } from '../../domain.users/entities/user.entity';

@Entity('lecture')
export class Lecture {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 800,
    nullable: true
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 3500,
    nullable: false
  })
  youtubeEmbedId: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: [],
    array: true
  })
  documentsURLs: string[];

  @Column({
    type: 'int',
    nullable: false
  })
  order: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  isActive: boolean;

  @ManyToOne(() => Module, (module) => module.lectures)
  module: Module

  @ManyToMany(() => User, (user) => user.watchedLectures)
  watchedBy: User[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
