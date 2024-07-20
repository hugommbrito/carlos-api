import { IRewardRegisterDomain, IRewardRegisterInput, RewardRegisterDomain } from '../domains/reward-register.domain';
import { RewardRegister } from '../entity/reward-register.entity';

export class RewardRegisterMapper {
  static EntityToDomain(rewardRegisterEntity: RewardRegister): RewardRegisterDomain {
    return RewardRegisterDomain.load({ ...rewardRegisterEntity });
  }

  static DomainToPersistence(rewardRegisterDomain: RewardRegisterDomain): IRewardRegisterInput {
    return { ...rewardRegisterDomain.getPropsCopy() };
  }
}
