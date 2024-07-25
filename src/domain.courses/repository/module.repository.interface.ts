import { ModuleDomain } from '../domains/module.domain'

export interface ModuleRepositoryInterface {
  create(module: ModuleDomain): Promise<ModuleDomain>
  findAll(): Promise<ModuleDomain[]>
  findById(id: number): Promise<ModuleDomain>
  update(id: number, module: ModuleDomain): Promise<ModuleDomain>
  remove(id: number): Promise<void>
}
