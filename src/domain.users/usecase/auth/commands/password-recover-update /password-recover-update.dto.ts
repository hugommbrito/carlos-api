import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";

export class passwordRecoverUpdateDto {
  @ApiProperty({
    description: 'Nova senha do usuário',
    example: '654321',
  })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    {
      message(validationArguments) {
        const errorMsgs = [];
        if (validationArguments.value.length < 6) errorMsgs.push(' A senha deve conter pelo menos 6 caracteres ');
        if (!/[a-z]/.test(validationArguments.value))
          errorMsgs.push(' A senha deve conter pelo menos 1 letra minúscula ');
        if (!/[A-Z]/.test(validationArguments.value))
          errorMsgs.push(' A senha deve conter pelo menos 1 letra maiúscula ');
        if (!/[0-9]/.test(validationArguments.value)) errorMsgs.push(' A senha deve conter pelo menos 1 número ');
        if (!/[!@#$%^&*()_+\-=\[\]{}':"\\|,.<>\/?]/.test(validationArguments.value))
          errorMsgs.push(' A senha deve conter pelo menos 1 símbolo ');
        return errorMsgs.length != 0
          ? String(errorMsgs)
          : 'A senha deve conter pelo menos 6 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo.';
      }
    }
  )
  newPassword: string;
}