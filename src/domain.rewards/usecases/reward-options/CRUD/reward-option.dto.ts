import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateRewardOptionDto {
  @ApiProperty({
    description: 'Nome da opção de recompensa',
    example: 'Repost no Instagram'
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Descrição da opção de recompensa',
    example: 'Ao repostar uma publicação do nosso perfil no Instagram, você ganha 10 pontos!'
  })
  @IsString()
  description: string

  @ApiProperty({
    description: 'Quantidade de pontos que o usuário ganha ao realizar a opção de recompensa',
    example: 10
  })
  @IsNumber({maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false})
  @IsPositive()
  value: number

  @ApiProperty({
    description: 'Data de vencimento da opção de recompensa - se não for preenchido, não haverá data de vencimento',
    example: '2026-12-31',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date

  @ApiProperty({
    description: 'Se a opção de recompensa está ativa ou não',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ApiProperty({
    description: 'URL da imagem da opção de recompensa',
    example: 'https://www.google.com.br/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    required: false,
    default: process.env.DEFAULT_REWARD_OPTION_IMG_URL
  })
  @IsString()
  @IsOptional()
  imgUrl?: string
}

export class UpdateRewardOptionDto extends PartialType(CreateRewardOptionDto){}