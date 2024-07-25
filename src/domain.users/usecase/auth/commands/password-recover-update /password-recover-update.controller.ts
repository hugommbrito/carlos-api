import { Body, Controller, Param, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { PasswordRecoverUpdateUseCase } from './password-recover-update.usecase';
import { passwordRecoverUpdateDto } from './password-recover-update.dto';
import { AuthGuard } from '../../../../../domain.users/auth/guards/auth.guard';

@Controller('auth/password-recover-update')
@ApiTags('Autenticação')
export class PasswordRecoverUpdateController {
  constructor(private readonly passwordRecoverUpdateUseCase: PasswordRecoverUpdateUseCase) {}

  @ApiOperation({ summary: 'Atualizar senha do usuário pelo link enviado por email' })
  @ApiOkResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @Patch('/:token')
  async updatePassword(
    @Body()
    data: passwordRecoverUpdateDto,
    @Param('token')
    token: string
  ) {
    const result = await this.passwordRecoverUpdateUseCase.updatePassword(data, token);

    return { message: 'Senha atualizada com sucesso', user: result };
  }
}
