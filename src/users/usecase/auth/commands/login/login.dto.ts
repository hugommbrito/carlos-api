import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'joao@mail.com',
    description: 'Email do usuário'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qQ!111',
    description: 'Senha do usuário'
  })
  @IsString()
  password: string;
}
