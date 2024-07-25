import { Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../../domain.users/repository/user.repository.interface';
import { RequestRecoverEmailDto } from './request-recover-email.dto';
import { JwtService } from '@nestjs/jwt';
import { emailProvider } from '../../../../../providers/nodemailer/mailer.provider';

export class RequestRecoverEmailUsecase {
  constructor(
    @Inject('user_repository')
    private readonly userRepository: UserRepositoryInterface,

    private readonly jwtService: JwtService,
    private readonly mailerService: emailProvider
  ) {}

  async requestResetEmail(data: RequestRecoverEmailDto): Promise<any> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      return {
        message: 'Email enviado com sucesso!'
      };
    }

    const token = this.jwtService.sign(
      {
        sub: user.getPropsCopy().id
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '30m'
      }
    );

    const emailInformation = {
      to: user.getPropsCopy().email,
      subject: 'Recuperação de senha - Não Pense Vai!',
      text: `Olá ${user.getPropsCopy().name}, clique no link para recuperar sua senha: ${
        process.env.FRONTEND_URL
      }/reset-password/${token}`,
      html: `<p>Olá ${user.getPropsCopy().name},</p><br/>
      <p>Clique no link para recuperar sua senha: <a href="${
        process.env.FRONTEND_URL
      }/reset-password/${token}">Recuperar senha</a></p></br>
      <p>Este link é válido para alterar sua senha durante <strong>30 minutos</strong>, após este prazo, favor solicitar um novo link.</p>`
    };

    await this.mailerService.sendEmail(emailInformation);

    return {
      message: 'Email de recuperação de senha enviado com sucesso!'
    };
  }
}
