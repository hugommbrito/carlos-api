import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardRegisterDomain } from 'src/domain.rewards/domains/reward-register.domain';
import { RewardRegister } from 'src/domain.rewards/entity/reward-register.entity';
import { RewardRegisterMapper } from 'src/domain.rewards/mappers/reward-register.mappers';
import { Repository } from 'typeorm';
import { RewardRegisterRepositoryInterface } from '../reward-register.repository.interface';

@Injectable()
export class RewardRegisterRepository implements RewardRegisterRepositoryInterface {
  constructor(
    @InjectRepository(RewardRegister)
    private readonly rewardRegisterRepository: Repository<RewardRegister>
  ) {}

  async create(rewardRegister: RewardRegisterDomain): Promise<RewardRegisterDomain> {
    try {
      const rewardRegisterProps = RewardRegisterMapper.DomainToPersistence(rewardRegister);

      const rewardRegisterEntity = this.rewardRegisterRepository.create(rewardRegisterProps);
      const rewardRegisterPersistedOrError = await this.rewardRegisterRepository.save(rewardRegisterEntity);

      if (rewardRegisterPersistedOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          { description: 'Erro ao persistir registro no DB', cause: 'reward-register.repository-try' }
        );

      return RewardRegisterMapper.EntityToDomain(rewardRegisterPersistedOrError);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Erro ao persistir registro no DB', cause: 'reward-register.repository-catch' }
      );
    }
  }

  async findAll(): Promise<RewardRegisterDomain[]> {
    const rewardRegisters = await this.rewardRegisterRepository.find({
      relations: ['user', 'reward']
    });
    if (!rewardRegisters) return null;

    return rewardRegisters.map((rewRegister) => RewardRegisterMapper.EntityToDomain(rewRegister));
  }

  async findById(id: string): Promise<RewardRegisterDomain> {
    const rewardRegister = await this.rewardRegisterRepository.findOne({
      where: { id: id },
      relations: ['user', 'reward']
    });
    if (!rewardRegister) return null;

    return RewardRegisterMapper.EntityToDomain(rewardRegister);
  }

  async update(id: string, rewardRegister: RewardRegisterDomain): Promise<RewardRegisterDomain> {
    id || rewardRegister ? null : null; //DELETAR ESSA LINHA AO IMPLEMENTAR O MÉTODO
    console.log('METODO NÃO IMPLEMENTADO - UPDATE DE REGISTRO DE RECOMPENSA');
    throw new NotImplementedException(
      {},
      {
        description: 'Método não implementado',
        cause: 'reward-register.repository'
      }
    );
  }

  async delete(id: string): Promise<void> {
    const rewardRegister = await this.rewardRegisterRepository.findOneBy({ id });
    if (!rewardRegister) {
      throw new NotFoundException(
        {},
        {
          description: 'Registro de recompensa não encontrado',
          cause: 'reward-register.repository'
        }
      );
    }

    await this.rewardRegisterRepository.delete(id);
  }
}
