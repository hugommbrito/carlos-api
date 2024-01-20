import { Injectable } from "@nestjs/common";
import { IUserDomain, UserDomain } from "src/users/domains/user.domain";
import { UserRepositoryInterface } from "../user.repository.interface";
import { UserMapper } from "src/users/mappers/user.mappers";

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private userDB: IUserDomain[] = []
  
  async create(user: UserDomain): Promise<UserDomain> {
    // METODO PARA CRIAR USUARIO NO DB
    return 
  }

  async update(id: string, user: UserDomain): Promise<UserDomain> {
    // METODO PARA ATUALIZAR USUARIO NO DB
    return
  }

  async findOne(id: string): Promise<UserDomain> {
    // METODO PARA BUSCAR USUARIO NO DB
    return
  }
  
  async findAll(): Promise<UserDomain[]> {
    // METODO PARA BUSCAR TODOS OS USUARIOS NO DB
    return
  }
  
  async remove(id: string): Promise<void> {
    // METODO PARA REMOVER USUARIO NO DB
    return
  }
}