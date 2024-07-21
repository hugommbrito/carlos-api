import { IModuleDomain, ModuleDomain } from '../domains/module.domain';
import { Module } from '../entity/module.entity';

export class ModuleMapper {
  static EntityToDomain(moduleEntity: Module): ModuleDomain {
    return ModuleDomain.load({ ...moduleEntity });
  }

  static DomainToPersistence(moduleDomain: ModuleDomain): IModuleDomain {
    return { ...moduleDomain.getAllPropsCopy() };
  }

  static EntityOrDomainToReturn(moduleEntityOrDomain: Module | ModuleDomain | IModuleDomain): IModuleDomain {
    if (moduleEntityOrDomain instanceof ModuleDomain) {
      return moduleEntityOrDomain.getAllPropsCopy();
    }

    if (moduleEntityOrDomain instanceof Module) {
      delete moduleEntityOrDomain.deletedAt;
      return moduleEntityOrDomain;
    }
  }
}
