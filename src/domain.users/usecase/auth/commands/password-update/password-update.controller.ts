import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { PasswordUpdateUseCase } from './password-update.usecase';
import { passwordUpdateDto } from './password-update.dto';
import { AuthGuard } from '../../../../../domain.users/auth/guards/auth.guard';

@Controller('auth/password-update')
@ApiTags('Autenticação')
export class PasswordUpdateController {
  constructor(private readonly passwordUpdateUseCase: PasswordUpdateUseCase) {}

  @ApiOperation({ summary: 'Atualizar senha do usuário logado' })
  @ApiOkResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiBadRequestResponse({ status: 400, description: 'Senha informada incorreta' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('')
  async updatePassword(
    @Body()
    data: passwordUpdateDto,
    @Req()
    request: { user: { sub: string } }
  ) {
    const result = await this.passwordUpdateUseCase.updatePassword(data, request.user.sub);

    return { message: 'Senha atualizada com sucesso', user: result };
  }
}
