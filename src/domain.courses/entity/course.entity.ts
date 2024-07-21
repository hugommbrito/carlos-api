import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Module } from './module.entity';

@Entity('course')
export class Course {
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
    nullable: false
  })
  description: string;

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

  @Column({
    type: 'varchar',
    length: 75,
    nullable: true
  })
  introductionEmbedVideoId: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true
  })
  coverImgUrl: string;

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
