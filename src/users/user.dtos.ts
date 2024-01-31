import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsIn, IsOptional, IsString, IsStrongPassword, Max, MaxDate, MaxLength, Min, MinLength, min, minLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ 
    example: "João",
    description: "Nome do usuário"
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;
  
  @ApiProperty({
    example: "da Silva Melo",
    description: "Sobrenome do usuário"
  })
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  surname: string;
  
  @ApiProperty({
    example: "1995-01-01",
    description: "Data de nascimento do usuário"
  })
  @IsDateString()
  birthdate: Date;
  
  @ApiProperty({
    example: "joao@mail.com",
    description: "Email do usuário",
    uniqueItems: true
  })
  @IsEmail()
  email: string;
  
  @ApiProperty({
    example: "aA1!000",
    description: "Senha do usuário",
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },
   {message(validationArguments) {
    const errorMsgs = []
    if(validationArguments.value.length < 6) errorMsgs.push( " A senha deve conter pelo menos 6 caracteres ")
    if(!/[a-z]/.test(validationArguments.value)) errorMsgs.push( " A senha deve conter pelo menos 1 letra minúscula ")
    if(!/[A-Z]/.test(validationArguments.value)) errorMsgs.push( " A senha deve conter pelo menos 1 letra maiúscula ")
    if(!/[0-9]/.test(validationArguments.value)) errorMsgs.push( " A senha deve conter pelo menos 1 número ")
    if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(validationArguments.value)) errorMsgs.push( " A senha deve conter pelo menos 1 símbolo ")
    return errorMsgs.length != 0 ? String(errorMsgs) : "A senha deve conter pelo menos 6 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo."
   },}
   )
  password: string;
  
  @ApiProperty({
    example: "admin",
    description: "Função do usuário",
    default: "user"
  })
  @IsIn(["admin", "staff", "user"])
  @IsOptional()
  role?: "admin" | "staff" | "user";
  
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateSelfDto extends OmitType(UpdateUserDto, ['role', 'password']) {}

