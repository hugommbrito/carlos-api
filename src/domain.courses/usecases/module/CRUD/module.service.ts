import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRepositoryInterface } from '../../../repository/module.repository.interface';
import { IModuleDomain, IModuleInput, ModuleDomain } from '../../../domains/module.domain';
import { ModuleMapper } from '../../../mappers/module.mappers';

@Injectable()
export class ModuleService {
  constructor(
    @Inject('module_repository')
    private readonly moduleRepository: ModuleRepositoryInterface
  ) {}

  async create(data: IModuleInput): Promise<IModuleDomain> {
    const moduleDomain = ModuleDomain.create(data);

    const modulePersisted = await this.moduleRepository.create(moduleDomain);

    return ModuleMapper.EntityOrDomainToReturn(modulePersisted);
  }

  async findAll(): Promise<IModuleDomain[]> {
    const moduleDomainList = await this.moduleRepository.findAll();
    if (!moduleDomainList)
      throw new NotFoundException(
        {},
        { description: 'Nenhum Módulo de Curso encontrado', cause: 'module.service' }
      );

    return moduleDomainList.map((module) => ModuleMapper.EntityOrDomainToReturn(module));
  }

  async findById(id: number): Promise<IModuleDomain> {
    const moduleDomain = await this.moduleRepository.findById(id);
    if (!moduleDomain)
      throw new NotFoundException(
        {},
        { description: 'Módulo de Curso não encontrado', cause: 'module.service' }
      );

    return ModuleMapper.EntityOrDomainToReturn(moduleDomain);
  }

  async update(id: number, data: Partial<IModuleInput>): Promise<IModuleDomain> {
    const moduleDomain = await this.moduleRepository.findById(id);
    if (!moduleDomain)
      throw new NotFoundException(
        {},
        { description: 'Módulo de Curso não encontrado', cause: 'module.service' }
      );

    moduleDomain.updateSelf(data);

    const moduleUpdated = await this.moduleRepository.update(id, moduleDomain);

    return ModuleMapper.EntityOrDomainToReturn(moduleUpdated);
  }

  async remove(id: number): Promise<void> {
    await this.moduleRepository.remove(id);
  }
}
