import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RewardOptionRepositoryInterface } from '../../../repository/reward-option.repository.interface';
import { IRewardOptionDomain, IRewardOptionInput, RewardOptionDomain } from '../../../domains/reward-option.domain';
import { RewardOptionMapper } from '../../../mappers/reward-option.mappers';

@Injectable()
export class RewardOptionService {
  constructor(
    @Inject('reward-option_repository')
    private readonly rewardOptionRepository: RewardOptionRepositoryInterface
  ) {}

  async create(data: IRewardOptionInput): Promise<IRewardOptionDomain> {
    const rewardOptionDomain = RewardOptionDomain.create(data);

    const rewardOptionPersisted = await this.rewardOptionRepository.create(rewardOptionDomain);

    return RewardOptionMapper.EntityOrDomainToReturn(rewardOptionPersisted);
  }

  async findAll(): Promise<IRewardOptionDomain[]> {
    const rewardOptionDomainList = await this.rewardOptionRepository.findAll();
    if (!rewardOptionDomainList)
      throw new NotFoundException(
        {},
        { description: 'Nenhuma Opção de Recompensa encontrada', cause: 'reward-options.service' }
      );

    return rewardOptionDomainList.map((rewardOption) => RewardOptionMapper.EntityOrDomainToReturn(rewardOption));
  }

  async findById(id: string): Promise<IRewardOptionDomain> {
    const rewardOptionDomain = await this.rewardOptionRepository.findById(id);
    if (!rewardOptionDomain)
      throw new NotFoundException(
        {},
        { description: 'Opção de Recompensa não encontrada', cause: 'reward-options.service' }
      );

    return RewardOptionMapper.EntityOrDomainToReturn(rewardOptionDomain);
  }

  async update(id: string, data: Partial<IRewardOptionInput>): Promise<IRewardOptionDomain> {
    const rewardOptionDomain = await this.rewardOptionRepository.findById(id);
    if (!rewardOptionDomain)
      throw new NotFoundException(
        {},
        { description: 'Opção de Recompensa não encontrada', cause: 'reward-options.service' }
      );

    rewardOptionDomain.updateSelf(data);

    const rewardOptionUpdated = await this.rewardOptionRepository.update(id, rewardOptionDomain);

    return RewardOptionMapper.EntityOrDomainToReturn(rewardOptionUpdated);
  }

  async remove(id: string): Promise<void> {
    await this.rewardOptionRepository.remove(id);
  }
}
