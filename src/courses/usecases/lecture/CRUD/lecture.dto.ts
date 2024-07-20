// lecture.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateLectureDto {
  @ApiProperty({
    description: 'Nome da palestra',
    example: 'Introdução ao Fitness'
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Descrição da palestra',
    example: 'Uma introdução ao mundo do fitness'
  })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    description: 'URL do vídeo da palestra',
    example: 'https://www.youtube.com/watch?v=12345'
  })
  @IsString()
  youtubeEmbedId: string

  @ApiProperty({
    description: 'Lista de URLs dos documentos relacionados à palestra',
    example: ['https://url-doc1.com', 'https://url-doc2.com']
  })
  @IsArray()
  @IsString({each: true})
  documentsURLs: string[]

  @ApiProperty({
    description: 'Ordem de exibição da palestra',
    example: 1
  })
  @IsNumber({maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false})
  @IsPositive()
  order: number

  @ApiProperty({
    description: 'Se a palestra está ativa ou não',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ApiProperty({
    description: 'ID do módulo ao qual a palestra pertence',
    example: 1
  })
  @IsNumber()
  @IsPositive()
  moduleId: number
}

export class UpdateLectureDto extends PartialType(CreateLectureDto) {}
