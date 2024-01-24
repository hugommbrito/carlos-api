import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginUseCase } from "src/users/usecase/auth/commands/login/login.usecase";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly loginService: LoginUseCase
  ){
    super()
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(email, password);
    const user = await this.loginService.execute({email, password})
    if(!user){
      throw new UnauthorizedException('Usuário ou senha inválidos', {cause: 'auth.localStrategy'})
    }
    return user
  }
}