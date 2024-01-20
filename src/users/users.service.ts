import { Inject, Injectable } from '@nestjs/common';
import { IUserDomainInput, IUserDomainReturn, UserDomain } from './domains/user.domain';
import { UserMapper } from './mappers/user.mappers';
import { UserRepositoryInterface } from './repository/user.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('user_repository')
    private readonly userRepository: UserRepositoryInterface
  ){}

  async create(data: IUserDomainInput): Promise<IUserDomainReturn> {
    const userDomain = UserDomain.create(data)
    userDomain.encryptPassword()

    const userPersisted = await this.userRepository.create(userDomain)

    return UserMapper.EntityOrDomainToReturn(userPersisted)
  }

  async findAll(): Promise<IUserDomainReturn[]> {
    const usersDomain = await this.userRepository.findAll()
    return usersDomain.map(user => UserMapper.EntityOrDomainToReturn(user))
  }

  async findOne(id: string): Promise<IUserDomainReturn> {
    const userDomain = await this.userRepository.findOne(id)
    return UserMapper.EntityOrDomainToReturn(userDomain)
  }

  async update(id: string, data: Partial<IUserDomainInput>): Promise<IUserDomainReturn> {
    const userDomain = await this.userRepository.findOne(id)

    if(data.password) userDomain.encryptPassword()
    userDomain.updateSelf(data)
    
    const userUpdated = await this.userRepository.update(id, userDomain)

    return UserMapper.EntityOrDomainToReturn(userDomain)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.remove(id)
  }

}
