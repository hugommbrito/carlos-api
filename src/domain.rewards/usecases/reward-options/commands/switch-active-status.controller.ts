import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { SwitchActiveStatusUsecase } from './switch-active-status.usecase';
import { Roles } from '../../../../domain.users/auth/rolesConfig/role.decorator';
import { Role } from '../../../../domain.users/auth/rolesConfig/role.enum';
import { AuthGuard } from '../../../../domain.users/auth/guards/auth.guard';
import { RoleGuard } from '../../../../domain.users/auth/guards/roles.guard';

@Controller('reward-options/switch-active-status')
@ApiTags('Opções de Recompensa')
export class SwitchActiveStatusController {
  constructor(private readonly switchActiveStatusUsecase: SwitchActiveStatusUsecase) {}

  @ApiOperation({ summary: 'Ativar/Desativar uma Opção de Recompensa pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Status da Opção de Recompensa atualizada com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Opção de Recompensa não encontrada' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin, Role.staff)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id')
    id: string
  ) {
    const result = await this.switchActiveStatusUsecase.execute(id);
    return {
      message: `Opção de Recompensa "${result.name}", ${result.isActive ? 'ATIVADA' : 'DESATIVADA'} com sucesso!`,
      rewardOption: result
    };
  }
}
