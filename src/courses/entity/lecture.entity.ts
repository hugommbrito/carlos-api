import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Module } from "./module.entity";

@Entity('lecture')
export class Lecture {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  name: string

  @Column({
    type: 'varchar',
    length: 800,
    nullable: true
  })
  description: string

  @Column({
    type: 'varchar',
    length: 3500,
    nullable: false
  })
  youtubeEmbedId: string

  @Column({
    type: 'varchar',
    nullable: true,
    default: [],
    array: true,
  })
  documentsURLs: string[]

  @Column({
    type: 'int',
    nullable: false
  })
  order: number

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => Module, (module) => module.lectures)
  module: Module

}