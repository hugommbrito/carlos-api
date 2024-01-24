import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDomain } from "src/users/domains/user.domain";
import { User } from "src/users/entities/user.entity";
import { UserMapper } from "src/users/mappers/user.mappers";
import { Repository } from "typeorm";
import { UserRepositoryInterface } from "../user.repository.interface";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  
  async create(user: UserDomain): Promise<UserDomain> {
    try {
      const userProps = UserMapper.DomainToPersistence(user)
  
      const userEntity = this.userRepository.create(userProps)
      const userPersistedOrError = await this.userRepository.save(userEntity)
  
      if (userPersistedOrError instanceof Error) throw new InternalServerErrorException('Erro ao persistir usuário no DB')
      
      return UserMapper.EntityToDomain(userPersistedOrError)

    } catch (error) {
      console.error(error);
      if(error['code'] === '23505') throw new BadRequestException('Email já cadastrado')
      throw new InternalServerErrorException('Erro ao atualizar usuário no DB')
    }
  }

  async update(id: string, user: UserDomain): Promise<UserDomain> {
    try{
      const userToUpdate = await this.userRepository.findOneBy({id})
      if(!userToUpdate) throw new InternalServerErrorException('Erro ao fazer a consulta no DB, usuário não encontrado')
  
      const userProps = UserMapper.DomainToPersistence(user)
  
      const updatedUserOrError = await this.userRepository.update(id, userProps)
      if (updatedUserOrError instanceof Error) throw new InternalServerErrorException('Erro ao permanecer as atualizações do usuário no DB')
  
      return UserMapper.EntityToDomain(userToUpdate)

    } catch (error) {
      console.error(error);
      if(error['code'] === '23505') throw new BadRequestException('Email já cadastrado')
      throw new InternalServerErrorException('Erro ao atualizar usuário no DB')
    }
  }

  async findById(id: string): Promise<UserDomain> {
    const user = await this.userRepository.findOneBy({id})
    if(!user) throw new NotFoundException('Usuário não encontrado')
    
    return UserMapper.EntityToDomain(user)
  }

  async findByEmail(email: string): Promise<UserDomain> {
    const user = await this.userRepository.findOneBy({email})
    if(!user) throw new NotFoundException('Usuário não encontrado')
    
    return UserMapper.EntityToDomain(user)
  }
  
  async findAll(): Promise<UserDomain[]> {
    const users = await this.userRepository.find()
    if(!users) throw new InternalServerErrorException('Erro ao fazer a consulta no DB, usuários não encontrados')
    
    return users.map(user => UserMapper.EntityToDomain(user))
  }
  
  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({id})
    if(!user) throw new NotFoundException('Erro ao fazer a consulta no DB, usuário não encontrado')

    this.userRepository.softRemove(user)
  }
}