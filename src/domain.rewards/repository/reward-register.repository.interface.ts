import { RewardRegisterDomain } from '../domains/reward-register.domain';

export interface RewardRegisterRepositoryInterface {
  create(rewardRegister: RewardRegisterDomain): Promise<RewardRegisterDomain>;
  findAll(): Promise<RewardRegisterDomain[]>;
  findById(id: string): Promise<RewardRegisterDomain>;
  update(id: string, rewardRegister: RewardRegisterDomain): Promise<RewardRegisterDomain>;
  delete(id: string): Promise<void>;
}
