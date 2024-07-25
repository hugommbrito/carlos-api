import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RewardOptionRepositoryInterface } from '../reward-option.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardOption } from '../../../domain.rewards/entity/reward-option.entity';
import { Repository } from 'typeorm';
import { RewardOptionDomain } from '../../../domain.rewards/domains/reward-option.domain';
import { RewardOptionMapper } from '../../../domain.rewards/mappers/reward-option.mappers';

@Injectable()
export class RewardOptionRepository implements RewardOptionRepositoryInterface {
  constructor(
    @InjectRepository(RewardOption)
    private readonly rewardOptionRepository: Repository<RewardOption>
  ) {}

  async create(rewardOption: RewardOptionDomain): Promise<RewardOptionDomain> {
    try {
      const rewardOptionProps = RewardOptionMapper.DomainToPersistence(rewardOption);

      const rewardEntithy = this.rewardOptionRepository.create(rewardOptionProps);
      const rewardPersistedOrError = await this.rewardOptionRepository.save(rewardEntithy);

      if (rewardPersistedOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          { description: 'Erro ao persistir opção de recompensa no DB', cause: 'reward-option.repository-try' }
        );

      return RewardOptionMapper.EntityToDomain(rewardPersistedOrError);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Erro ao persistir opção de recompensa no DB', cause: 'reward-option.repository-catch' }
      );
    }
  }

  async update(id: string, rewardOption: RewardOptionDomain): Promise<RewardOptionDomain> {
    try {
      const rewardOptionToUpdate = await this.rewardOptionRepository.findOneBy({ id });
      if (!rewardOptionToUpdate) return null;

      const rewardOptionProps = RewardOptionMapper.DomainToPersistence(rewardOption);

      const updatedRewardOptionOrError = await this.rewardOptionRepository.update(id, rewardOptionProps);
      if (updatedRewardOptionOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          {
            description: 'Erro ao permanecer as atualizações da opção de recompensa no DB',
            cause: 'reward-option.repository-try'
          }
        );

      const updatedRewardOption = await this.rewardOptionRepository.findOneBy({ id });

      return RewardOptionMapper.EntityToDomain(updatedRewardOption);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Erro ao atualizar opção de recompensa no DB', cause: 'reward-option.repository-catch' }
      );
    }
  }

  async findById(id: string): Promise<RewardOptionDomain> {
    const rewardOption = await this.rewardOptionRepository.findOneBy({ id });
    if (!rewardOption) return null;

    return RewardOptionMapper.EntityToDomain(rewardOption);
  }

  async findAll(): Promise<RewardOptionDomain[]> {
    const rewardOptions = await this.rewardOptionRepository.find();
    if (!rewardOptions) return null;

    return rewardOptions.map((rewardOption) => RewardOptionMapper.EntityToDomain(rewardOption));
  }

  async remove(id: string): Promise<void> {
    const rewardOptionToRemove = await this.rewardOptionRepository.findOneBy({ id });

    if (!rewardOptionToRemove)
      throw new NotFoundException(
        {},
        { description: 'Opção de recompensa não encontrada', cause: 'reward-option.repository-remove' }
      );

    await this.rewardOptionRepository.softRemove(rewardOptionToRemove);
  }
}
