import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserDomainInput, IUserDomainReturn, UserDomain } from '../../domains/user.domain';
import { UserMapper } from '../../mappers/user.mappers';
import { UserRepositoryInterface } from '../../repository/user.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('user_repository')
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async create(data: IUserDomainInput): Promise<IUserDomainReturn> {
    const userDomain = UserDomain.create(data);
    userDomain.encryptPassword();
    

    const userPersisted = await this.userRepository.saveCreate(userDomain);

    return UserMapper.EntityOrDomainToReturn(userPersisted);
  }

  async findAll(): Promise<IUserDomainReturn[]> {
    const usersDomain = await this.userRepository.findAll();
    if (!usersDomain)
      throw new NotFoundException({}, { description: 'Nenhum usuário encontrado', cause: 'users.service' });

    return usersDomain.map((user) => UserMapper.EntityOrDomainToReturn(user));
  }

  async findById(id: string): Promise<IUserDomainReturn> {
    const userDomain = await this.userRepository.findById(id);
    if (!userDomain) throw new NotFoundException({}, { description: 'Usuário não encontrado', cause: 'users.service' });

    return UserMapper.EntityOrDomainToReturn(userDomain);
  }

  async update(id: string, data: Partial<IUserDomainInput>): Promise<IUserDomainReturn> {
    const userDomain = await this.userRepository.findById(id);
    if (!userDomain) throw new NotFoundException({}, { description: 'Usuário não encontrado', cause: 'users.service' });

    
    if (data.password) userDomain.encryptPassword();
    userDomain.updateSelf(data);

    const userUpdated = await this.userRepository.update(id, userDomain);

    return UserMapper.EntityOrDomainToReturn(userUpdated);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.remove(id);
  }
}
