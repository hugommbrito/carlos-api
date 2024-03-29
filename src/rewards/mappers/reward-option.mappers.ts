import { IRewardOptionDomain, RewardOptionDomain } from '../domains/reward-option.domain';
import { RewardOption } from '../entity/reward-option.entity';

export class RewardOptionMapper {
  static EntityToDomain(rewardOptionEntity: RewardOption): RewardOptionDomain {
    return RewardOptionDomain.load({ ...rewardOptionEntity });
  }

  static DomainToPersistence(rewardOptionDomain: RewardOptionDomain): IRewardOptionDomain {
    return { ...rewardOptionDomain.getPropsCopy() };
  }

  static EntityOrDomainToReturn(
    rewardOptionEntityOrDomain: RewardOption | RewardOptionDomain | IRewardOptionDomain
  ): IRewardOptionDomain {
    if (rewardOptionEntityOrDomain instanceof RewardOptionDomain) {
      return rewardOptionEntityOrDomain.getPropsCopy();
    }

    if (rewardOptionEntityOrDomain instanceof RewardOption) {
      delete rewardOptionEntityOrDomain.deletedAt;
      return rewardOptionEntityOrDomain;
    }
  }
}
