import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RewardOption } from './reward-option.entity';

@Entity('reward_registers')
export class RewardRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    nullable: false
  })
  date: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  isWithdraw: boolean;

  @Column({
    type: 'int',
    nullable: false
  })
  pointAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.rewardRegisters)
  user: User;

  @ManyToOne(() => RewardOption, (rewardOption) => rewardOption.rewardRegisters)
  rewardOption: RewardOption;
}
