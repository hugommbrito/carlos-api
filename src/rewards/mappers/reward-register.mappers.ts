import { IRewardRegisterDomain, IRewardRegisterInput, ReawrdRegisterDomain } from "../domains/reward-register.domain";
import { RewardRegister } from "../entity/reward-register";

export class RewardRegisterMapper {
  static EntityToDomain(rewardRegisterEntity: RewardRegister): ReawrdRegisterDomain {
    return ReawrdRegisterDomain.load(
      {...rewardRegisterEntity}
    )
  }

  static DomainToPersistence(rewardRegisterDomain: ReawrdRegisterDomain): IRewardRegisterInput {
    return {...rewardRegisterDomain.getPropsCopy()}
  }

}