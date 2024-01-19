import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dtos';
import { stat } from 'fs';

@Controller('users')
@ApiTags('Usuários')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ){}

  @ApiOperation({summary: 'Criar um usuário'})
  @ApiCreatedResponse({status: 201, description: 'Usuário criado com sucesso'})
  @ApiBadRequestResponse({status: 400, description: 'Erro por requisição mal formatada ou campos inválidos'})
  @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno do servidor'})
  @Post('')
  async create(
    @Body()
    data: CreateUserDto,
  ){
    data.birthdate = new Date(data.birthdate)
    const result = await this.usersService.create(data)
    return {message: `Usuário ${result.name} criado com sucesso!`,user: result}
  }

  @ApiOperation({summary: 'Listar todos os usuários'})
  @ApiOkResponse({status: 200, description: 'Usuários listados com sucesso'})
  @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno do servidor'})
  @Get('')
  async findAll(){
    const result = await this.usersService.findAll()
    return result
  }

  @ApiOperation({summary: 'Buscar um usuário pelo ID'})
  @ApiNotFoundResponse({status: 404, description: 'Usuário não encontrado'})
  @ApiOkResponse({status: 200, description: 'Usuário encontrado com sucesso'})
  @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno do servidor'})
  @Get(':id')
  async findOne(
    @Param('id')
    id: string
  ){
    const result = await this.usersService.findOne(id)
    return result
  }

  @ApiOperation({summary: 'Atualizar um usuário'})
  @ApiOkResponse({status: 200, description: 'Usuário atualizado com sucesso'})
  @ApiNotFoundResponse({status: 404, description: 'Usuário não encontrado'})
  @ApiBadRequestResponse({status: 400, description: 'Erro por requisição mal formatada ou campos inválidos'})
  @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno do servidor'})
  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    data: UpdateUserDto
  ){
    const result = await this.usersService.update(id, data)
    return {message: `Usuário ${result.name} atualizado com sucesso!`,user: result}
  }

  @ApiOperation({summary: 'Remover um usuário'})
  @ApiNoContentResponse({status: 204, description: 'Usuário removido com sucesso'})
  @ApiNotFoundResponse({status: 404, description: 'Usuário não encontrado'})
  @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno do servidor'})
  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param('id')
    id: string
  ){
    await this.usersService.remove(id)
  }

}
