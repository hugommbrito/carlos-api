import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from 'src/damin.users/auth/guards/auth.guard';
import { RoleGuard } from 'src/damin.users/auth/guards/roles.guard';
import { Roles } from 'src/damin.users/auth/rolesConfig/role.decorator';
import { Role } from 'src/damin.users/auth/rolesConfig/role.enum';
import { ModuleService } from './module.service';
import { CreateModuleDto, UpdateModuleDto } from './module.dto';

@Controller('module')
@ApiTags('Módulo')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @ApiOperation({ summary: 'Criar um novo módulo de curso' })
  @ApiCreatedResponse({ status: 201, description: 'Módulo de curso criado com sucesso' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('')
  async create(
    @Body()
    data: CreateModuleDto
  ) {
    const isActive = data.isActive ?? true;
    const result = await this.moduleService.create({ ...data, isActive });
    return { message: `Módulo de curso ${result.name} criado com sucesso!`, module: result };
  }

  @ApiOperation({ summary: 'Listar todos os módulos de curso' })
  @ApiOkResponse({ status: 200, description: 'Módulos de curso listados com sucesso' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('')
  async findAll() {
    const result = await this.moduleService.findAll();
    return result;
  }

  @ApiOperation({ summary: 'Buscar um módulo de curso pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Módulo de curso encontrado com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Módulo de curso não encontrado' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(
    @Param('id')
    id: number
  ) {
    const result = await this.moduleService.findById(id);
    return result;
  }

  @ApiOperation({ summary: 'Atualizar um módulo de curso pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Módulo de curso atualizado com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Módulo de curso não encontrado' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id')
    id: number,
    @Body()
    data: UpdateModuleDto
  ) {
    const result = await this.moduleService.update(id, data);
    return { message: `Módulo de curso ${result.name} atualizado com sucesso!`, module: result };
  }

  @ApiOperation({ summary: 'Remover um módulo de curso pelo ID' })
  @ApiNoContentResponse({ status: 204, description: 'Módulo de curso removido com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Módulo de curso não encontrado' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async remove(
    @Param('id')
    id: number
  ) {
    await this.moduleService.remove(id);
  }
}
