import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Nome do curso',
    example: 'Fundamentos de Fitness'
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Descrição do curso',
    example: 'Aprenda os fundamentos básicos de fitness e exercícios neste curso introdutório.'
  })
  @IsString()
  description: string

  @ApiProperty({
    description: 'ID do vídeo de introdução do curso',
    example: 'dQw4w9WgXcQ'
  })
  @IsString()
  introductionEmbedVideoId: string

  @ApiProperty({
    description: 'URL da imagem de capa do curso',
    example: 'https://www.example.com/image.jpg'
  })
  @IsString()
  coverImgUrl: string

  @ApiProperty({
    description: 'Ordem de exibição do curso',
    example: 1
  })
  @IsNumber({maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false})
  @IsPositive()
  order: number

  @ApiProperty({
    description: 'Se o curso está ativo ou não',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ApiProperty({
    description: 'Data de exclusão do curso - se não for preenchido, o curso não está excluído',
    example: '2026-12-31',
    required: false
  })
  @IsDateString()
  @IsOptional()
  deletedAt?: Date
}

export class UpdateCourseDto extends PartialType(CreateCourseDto){}
