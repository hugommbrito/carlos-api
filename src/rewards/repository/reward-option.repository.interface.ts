import { RewardOptionDomain } from '../domains/reward-option.domain'

export interface RewardOptionRepositoryInterface {
  create(rewardOption: RewardOptionDomain): Promise<RewardOptionDomain>
  findAll(): Promise<RewardOptionDomain[]>
  findById(id: string): Promise<RewardOptionDomain>
  update(id: string, rewardOption: RewardOptionDomain): Promise<RewardOptionDomain>
  remove(id: string): Promise<void>
}
