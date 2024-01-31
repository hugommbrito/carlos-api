import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RewardOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 350,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  value: number;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  dueDate?: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'varchar',
    length: 3500,
    nullable: false,
    default: process.env.DEFAULT_REWARD_OPTION_IMG_URL,
  })
  imgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}