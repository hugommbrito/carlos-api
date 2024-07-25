import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ModuleRepositoryInterface } from '../module.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from '../../../domain.courses/entity/module.entity';
import { ModuleDomain } from '../../../domain.courses/domains/module.domain';
import { ModuleMapper } from '../../../domain.courses/mappers/module.mappers';
import { Course } from '../../../domain.courses/entity/course.entity';

@Injectable()
export class ModuleRepository implements ModuleRepositoryInterface {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  async create(module: ModuleDomain): Promise<ModuleDomain> {
    try {
      const moduleProps = ModuleMapper.DomainToPersistence(module);
      const courseEntity = await this.courseRepository.findOne({ where: { id: moduleProps.courseId } });

      // delete moduleProps.id
      const entity = this.moduleRepository.create({ ...moduleProps, course: courseEntity, lectures: [] });
      const persistedOrError = await this.moduleRepository.save(entity);

      if (persistedOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          { description: 'Erro ao persistir o módulo no DB', cause: 'module.repository-create-try' }
        );

      return ModuleMapper.EntityToDomain(persistedOrError);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Erro ao persistir o módulo no DB', cause: 'module.repository-create-catch' }
      );
    }
  }

  async update(id: number, module: ModuleDomain): Promise<ModuleDomain> {
    try {
      const moduleToUpdate = await this.moduleRepository.findOne({ where: { id } });
      if (!moduleToUpdate) return null;

      const moduleProps = ModuleMapper.DomainToPersistence(module);
      const { course, courseId, lectures, ...updatableProps } = moduleProps;

      const updatedModuleOrError = await this.moduleRepository.update(id, updatableProps);
      if (updatedModuleOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          {
            description: 'Erro ao atualizar o módulo no DB',
            cause: 'module.repository-update-try'
          }
        );

      const updatedModule = await this.moduleRepository.findOne({ where: { id } });

      return ModuleMapper.EntityToDomain(updatedModule);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Erro ao atualizar o módulo no DB', cause: 'module.repository-update-catch' }
      );
    }
  }

  async findById(id: number): Promise<ModuleDomain> {
    const module = await this.moduleRepository.findOne({ where: { id } });
    if (!module) return null;

    return ModuleMapper.EntityToDomain(module);
  }

  async findAll(): Promise<ModuleDomain[]> {
    const modules = await this.moduleRepository.find();
    if (!modules) return null;

    return modules.map((module) => ModuleMapper.EntityToDomain(module));
  }

  async remove(id: number): Promise<void> {
    const moduleToRemove = await this.moduleRepository.findOne({ where: { id } });

    if (!moduleToRemove)
      throw new NotFoundException({}, { description: 'Módulo não encontrado', cause: 'module.repository-remove' });

    await this.moduleRepository.softRemove(moduleToRemove);
  }
}
