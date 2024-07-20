import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotImplementedException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from 'src/damin.users/repository/user.repository.interface';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('user_repository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService
  ) {}

  async execute(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user)
      throw new UnauthorizedException({}, { description: 'Usuário ou senha inválidos', cause: 'login.usecase.' });

    const passwordMatch = user.checkPassword(data.password);
    if (!passwordMatch)
      throw new UnauthorizedException({}, { description: 'Usuário ou senha inválidos', cause: 'login.usecase..' });

    const userProps = user.getPropsCopy();
    const tokenPayload = {
      sub: userProps.id,
      name: userProps.name,
      role: userProps.role
    };
    const token = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return { accessToken: token };
  }
}
