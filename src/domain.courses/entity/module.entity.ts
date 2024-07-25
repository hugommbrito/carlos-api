import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { Course } from './course.entity';

@Entity('module')
export class Module {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  name: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Lecture, (lecture) => lecture.module)
  lectures: Lecture[];

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;
}
