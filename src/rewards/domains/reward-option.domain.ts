import { MethodNotAllowedException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export class RewardOptionDomain {
  private readonly props: IRewardOptionDomain;

  constructor(inputProps: IRewardOptionInput, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date) {
    const now = new Date();
    this.props = {
      ...inputProps,
      imgUrl: inputProps.imgUrl || process.env.DEFAULT_REWARD_OPTION_IMG_URL,
      id: id || randomUUID(),
      createdAt: createdAt || now,
      updatedAt: updatedAt || now,
      deletedAt: deletedAt || null
    };
    this.validate();
  }

  private validate(): void {
    if (!this.props.name) throw new Error('Name is required');
    if (!this.props.description) throw new Error('Description is required');
    if (!this.props.value) throw new Error('Value is required');
  }

  static create(inputProps: IRewardOptionInput): RewardOptionDomain {
    return new RewardOptionDomain(inputProps);
  }

  static load(props: IRewardOptionDomain): RewardOptionDomain {
    return new RewardOptionDomain(props, props.id, props.createdAt, props.updatedAt, props.deletedAt);
  }

  public updateSelf(props: Partial<IRewardOptionInput>): void {
    Object.keys(props).forEach((propKey) => {
      if (propKey === 'createdAt' || propKey === 'updatedAt' || propKey === 'deletedAt' || propKey === 'id') {
        throw new MethodNotAllowedException(
          {},
          {
            description: `${propKey} não pode ser atualizado por este método`,
            cause: 'reward-option.domain-updateSelf'
          }
        );
      }
      this.props[propKey] = props[propKey];
    });
  }

  public getAllPropsCopy(): IRewardOptionDomain {
    return Object.freeze({ ...this.props });
  }
  public getPropsCopy(): IRewardOptionDomain {
    const { deletedAt, ...otherProps } = this.props;
    return Object.freeze(otherProps);
  }

  public switchActiveStatus(): void {
    this.props.isActive = !this.props.isActive;
  }
}

export interface IRewardOptionDomain extends IRewardOptionInput {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IRewardOptionInput {
  name: string;
  description: string;
  value: number;
  dueDate?: Date;
  isActive?: boolean;
  imgUrl?: string;
}
