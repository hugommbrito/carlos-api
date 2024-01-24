import { Body, Controller, HttpException, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { LoginUseCase } from "./login.usecase";
import { LoginDto } from "./login.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth/login')
@ApiTags('Autenticação')
export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase
  ){}

  @ApiOperation({summary: 'Autenticar um usuário'})
  @ApiOkResponse({status: 200, description: 'Usuário autenticado com sucesso'})
  @ApiUnauthorizedResponse({status: 401, description: 'Usuário ou senha inválidos'})
  @ApiBadRequestResponse({status: 400, description: 'Erro por requisição mal formatada ou campos inválidos'})
  @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno do servidor'})
  @Post('')
  async login(
    @Body()
    data: LoginDto
  ){
      const result = await this.loginUseCase.execute(data)
      return {message: 'Usuário autenticado com sucesso!', ...result}
  }
}