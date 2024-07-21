import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RequestRecoverEmailDto {
  @ApiProperty({
    description: 'Email do usuário que quer redefinir a senha',
    example: 'john.doe@mail.com'
  })
  @IsEmail()
  @IsString()
  email: string;
}
