import { Body, Controller, Post } from "@nestjs/common"
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { RequestRecoverEmailUsecase } from "./request-recover-email.usecase"
import { RequestRecoverEmailDto } from "./request-recover-email.dto"

@Controller('auth/password-recover')
@ApiTags('Autenticação')
export class RequestRecoverEmailController {
  constructor(
    private readonly requestRecoverEmailUseCase: RequestRecoverEmailUsecase
  ) {}

  @ApiOperation({ summary: 'Solicitar email de recuperação de senha' })
  @ApiOkResponse({ status: 200, description: 'Email de recuperação de senha enviado com sucesso' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @Post('')
  async requestRecoverEmail(
    @Body()
    data: RequestRecoverEmailDto
  ){
    const result = await this.requestRecoverEmailUseCase.requestResetEmail(data)

    return {...result}
  }

}