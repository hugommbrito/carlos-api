import { UserDomain } from 'src/users/domains/user.domain';
import { IRewardOptionDomain, RewardOptionDomain } from './reward-option.domain';
import { randomUUID } from 'crypto';
import { IUserDomain } from 'src/users/domains/user.domain';
import { User } from 'src/users/entities/user.entity';
import { RewardOption } from '../entity/reward-option.entity';

export class RewardRegisterDomain {
  private readonly props: IRewardRegisterDomain;

  constructor(inputProps: IRewardRegisterInput, id?: string, createdAt?: Date) {
    const now = new Date();
    this.props = {
      ...inputProps,
      id: id || randomUUID(),
      createdAt: createdAt || now
    };
    this.validate();
  }

  private validate(): void {
    if (!this.props.date) throw new Error('Date is required');
    if (!this.props.isWithdraw) throw new Error('Is withdraw is required');
    if (!this.props.pointAmount) throw new Error('Point amount is required');
  }

  static create(inputProps: IRewardRegisterInput): RewardRegisterDomain {
    return new RewardRegisterDomain(inputProps);
  }

  static load(props: IRewardRegisterDomain): RewardRegisterDomain {
    return new RewardRegisterDomain(props, props.id, props.createdAt);
  }

  public getPropsCopy(): IRewardRegisterDomain {
    return Object.freeze({ ...this.props });
  }
}

export interface IRewardRegisterDomain extends IRewardRegisterInput {
  id?: string;
  createdAt?: Date;
}

export interface IRewardRegisterInput {
  userId?: string;
  user?: IUserDomain | User;
  rewardOptionId?: string;
  rewardOption?: IRewardOptionDomain | RewardOption;
  date: Date;
  isWithdraw: boolean;
  pointAmount: number;
}
