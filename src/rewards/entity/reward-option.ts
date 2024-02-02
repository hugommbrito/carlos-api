import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RewardRegister } from "./reward-register";

@Entity('reward_options')
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

  @OneToMany(() => RewardRegister, rewardRegister => rewardRegister.rewardOption)
  rewardRegisters: RewardRegister[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}