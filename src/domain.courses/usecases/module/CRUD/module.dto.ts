import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    description: 'Nome do módulo do curso',
    example: 'Introdução ao Fitness'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Ordem de exibição do módulo',
    example: 1
  })
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
  @IsPositive()
  order: number;

  @ApiProperty({
    description: 'Se o módulo está ativo ou não',
    example: true,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID do curso ao qual o módulo pertence',
    example: 1
  })
  @IsNumber()
  @IsPositive()
  courseId: number;
}

export class UpdateModuleDto extends PartialType(CreateModuleDto) {}
