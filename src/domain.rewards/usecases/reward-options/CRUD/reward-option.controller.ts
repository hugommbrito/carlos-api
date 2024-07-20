import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { RewardOptionService } from './reward-option.service';
import { CreateRewardOptionDto, UpdateRewardOptionDto } from './reward-option.dto';
import { Roles } from 'src/domain.users/auth/rolesConfig/role.decorator';
import { Role } from 'src/domain.users/auth/rolesConfig/role.enum';
import { AuthGuard } from 'src/domain.users/auth/guards/auth.guard';
import { RoleGuard } from 'src/domain.users/auth/guards/roles.guard';

@Controller('reward-option')
@ApiTags('Opções de Recompensa')
export class RewardOptionController {
  constructor(private readonly rewardOptionService: RewardOptionService) {}

  @ApiOperation({ summary: 'Criar uma nova Opção de Recompensa' })
  @ApiCreatedResponse({ status: 201, description: 'Opção de Recompensa criada com sucesso' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('')
  async create(
    @Body()
    data: CreateRewardOptionDto
  ) {
    data.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    const result = await this.rewardOptionService.create(data);
    return { message: `Opção de Recompensa ${result.name} criada com sucesso!`, rewardOption: result };
  }

  @ApiOperation({ summary: 'Listar todas as Opções de Recompensa' })
  @ApiOkResponse({ status: 200, description: 'Opções de Recompensa listadas com sucesso' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('')
  async findAll() {
    const result = await this.rewardOptionService.findAll();
    return result;
  }

  @ApiOperation({ summary: 'Buscar uma Opção de Recompensa pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Opção de Recompensa encontrada com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Opção de Recompensa não encontrada' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(
    @Param('id')
    id: string
  ) {
    const result = await this.rewardOptionService.findById(id);
    return result;
  }

  @ApiOperation({ summary: 'Atualizar uma Opção de Recompensa pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Opção de Recompensa atualizada com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Opção de Recompensa não encontrada' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    data: UpdateRewardOptionDto
  ) {
    data.dueDate = data.dueDate ? new Date(data.dueDate) : undefined;
    const result = await this.rewardOptionService.update(id, data);
    return { message: `Opção de Recompensa ${result.name} atualizada com sucesso!`, rewardOption: result };
  }

  @ApiOperation({ summary: 'Remover uma Opção de Recompensa pelo ID' })
  @ApiNoContentResponse({ status: 204, description: 'Opção de Recompensa removida com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Opção de Recompensa não encontrada' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @HttpCode(204)
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async remove(
    @Param('id')
    id: string
  ) {
    await this.rewardOptionService.remove(id);
  }
}
