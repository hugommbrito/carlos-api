import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IRewardRegisterDomain,
  IRewardRegisterInput,
  RewardRegisterDomain
} from '../../../../domain.rewards/domains/reward-register.domain';
import { RewardRegisterRepositoryInterface } from '../../../../domain.rewards/repository/reward-register.repository.interface';

@Injectable()
export class RewardRegisterService {
  constructor(
    @Inject('reward-register_repository')
    private readonly rewardRegisterRepository: RewardRegisterRepositoryInterface
  ) {}

  async create(data: IRewardRegisterInput): Promise<IRewardRegisterDomain> {
    const rewardRegisterDomain = RewardRegisterDomain.create(data);

    const rewardRegisterPersisted = await this.rewardRegisterRepository.create(rewardRegisterDomain);

    return rewardRegisterPersisted.getPropsCopy();
  }

  async findAll(): Promise<IRewardRegisterDomain[]> {
    const rewardRegisterDomainList = await this.rewardRegisterRepository.findAll();
    if (!rewardRegisterDomainList)
      throw new NotFoundException(
        {},
        {
          description: 'Nenhuma recompensa encontrada',
          cause: 'reward-register.service'
        }
      );

    return rewardRegisterDomainList.map((rewardRegister) => rewardRegister.getPropsCopy());
  }

  async findById(id: string): Promise<IRewardRegisterDomain> {
    const rewardRegisterDomain = await this.rewardRegisterRepository.findById(id);
    if (!rewardRegisterDomain)
      throw new NotFoundException(
        {},
        {
          description: 'Nenhuma recompensa encontrada',
          cause: 'reward-register.service'
        }
      );

    return rewardRegisterDomain.getPropsCopy();
  }

  async update() {
    return 'METHOD NOT IMPLEMENTED';
  }

  async delete(id: string): Promise<void> {
    await this.rewardRegisterRepository.delete(id);
  }
}
