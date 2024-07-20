import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRewardOptionDomain } from 'src/domain.rewards/domains/reward-option.domain';
import { RewardOptionMapper } from 'src/domain.rewards/mappers/reward-option.mappers';
import { RewardOptionRepositoryInterface } from 'src/domain.rewards/repository/reward-option.repository.interface';

@Injectable()
export class SwitchActiveStatusUsecase {
  constructor(
    @Inject('reward-option_repository')
    private readonly rewardOptionRepository: RewardOptionRepositoryInterface
  ) {}

  async execute(id: string): Promise<IRewardOptionDomain> {
    const rewardOptionDomain = await this.rewardOptionRepository.findById(id);
    if (!rewardOptionDomain)
      throw new NotFoundException(
        {},
        { description: 'Opção de Recompensa não encontrada', cause: 'scwitch-active-status.usecase' }
      );

    rewardOptionDomain.switchActiveStatus();

    const rewardOptionUpdated = await this.rewardOptionRepository.update(id, rewardOptionDomain);

    return RewardOptionMapper.EntityOrDomainToReturn(rewardOptionUpdated);
  }
}
