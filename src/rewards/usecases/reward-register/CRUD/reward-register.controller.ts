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
import { RewardRegisterService } from './reward-register.service';
import { Roles } from 'src/users/auth/rolesConfig/role.decorator';
import { Role } from 'src/users/auth/rolesConfig/role.enum';
import { AuthGuard } from 'src/users/auth/guards/auth.guard';
import { RoleGuard } from 'src/users/auth/guards/roles.guard';
import { CreateRewardRegisterDto } from './reward-register.dto';

@Controller('reward-register')
@ApiTags('Registros de Recompensas')
export class RewardRegisterController {
  constructor(private readonly rewardRegisterService: RewardRegisterService) {}

  @ApiOperation({ summary: 'Cadastra um novo Registro de Recompensa' })
  @ApiCreatedResponse({ status: 201, description: 'Registro de Recompensa cadastrado com sucesso' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin, Role.staff)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('')
  async create(
    @Body()
    data: CreateRewardRegisterDto
  ) {
    const formatedDate = data.date ? new Date(data.date) : new Date();
    const result = await this.rewardRegisterService.create({ ...data, date: formatedDate });

    return {
      message: `Registro de Recompensa de ${data.pointAmount} pontos cadastrado com sucesso!`,
      rewardRegister: result
    };
  }

  @ApiOperation({ summary: 'Lista todos os Registros de Recompensa' })
  @ApiOkResponse({ status: 200, description: 'Registros de Recompensa listados com sucesso' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin, Role.staff)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('')
  async findAll() {
    const result = await this.rewardRegisterService.findAll();
    return result;
  }

  @ApiOperation({ summary: 'Buscar um Registro de Recompensa pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Registro de Recompensa encontrado com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Registro de Recompensa não encontrado' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(
    @Param('id')
    id: string
  ) {
    const result = await this.rewardRegisterService.findById(id);
    return result;
  }

  @ApiOperation({ summary: 'Rota de atualização não implementada' })
  @Patch()
  update() {
    return this.update();
  }

  @ApiOperation({ summary: 'Remove um Registro de Recompensa pelo ID' })
  @ApiNoContentResponse({ status: 204, description: 'Registro de Recompensa removido com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Registro de Recompensa não encontrado' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @HttpCode(204)
  @ApiBearerAuth()
  @Roles(Role.admin, Role.staff)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async remove(
    @Param('id')
    id: string
  ) {
    await this.rewardRegisterService.delete(id);
  }
}
