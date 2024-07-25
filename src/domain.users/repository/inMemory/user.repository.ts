import { Injectable } from '@nestjs/common';
import { IUserDomain, UserDomain } from '../../../domain.users/domains/user.domain';
import { UserRepositoryInterface } from '../user.repository.interface';
import { UserMapper } from '../../../domain.users/mappers/user.mappers';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private userDB: IUserDomain[] = [];

  async saveCreate(user: UserDomain): Promise<UserDomain> {
    // METODO PARA CRIAR USUARIO NO DB
    return;
  }

  async update(id: string, user: UserDomain): Promise<UserDomain> {
    // METODO PARA ATUALIZAR USUARIO NO DB
    return;
  }

  async findById(id: string): Promise<UserDomain> {
    // METODO PARA BUSCAR USUARIO NO DB
    return;
  }

  async findByEmail(id: string): Promise<UserDomain> {
    // METODO PARA BUSCAR USUARIO NO DB
    return;
  }

  async findAll(): Promise<UserDomain[]> {
    // METODO PARA BUSCAR TODOS OS USUARIOS NO DB
    return;
  }

  async remove(id: string): Promise<void> {
    // METODO PARA REMOVER USUARIO NO DB
    return;
  }
}
