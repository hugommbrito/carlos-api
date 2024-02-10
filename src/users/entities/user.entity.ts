import { RewardRegister } from 'src/rewards/entity/reward-register.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false
  })
  surname: string;

  @Column({
    type: 'date',
    nullable: false
  })
  birthdate: Date;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    enum: ['admin', 'staff', 'user'],
    default: 'user'
  })
  role: 'admin' | 'staff' | 'user';

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  isActive: boolean;

  @OneToMany(() => RewardRegister, (rewardRegister) => rewardRegister.user)
  rewardRegisters: RewardRegister[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
