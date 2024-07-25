import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { subDays } from 'date-fns';

export class CreateRewardRegisterDto {
  @ApiProperty({
    description: 'ID do usuário a quem o registro foi creditado/debitado',
    example: randomUUID()
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID da opção de recompensa que o usuário realizou',
    example: randomUUID()
  })
  @IsUUID()
  rewardOptionId: string;

  @ApiProperty({
    description: 'Data em que o registro foi feito (Deixar em Branco para atribuir a data de hoje)',
    example: subDays(new Date(), 2),
    required: false
  })
  @IsDateString()
  date?: Date;

  @ApiProperty({
    description: 'Se o registro é um débito ou crédito',
    example: true
  })
  @IsBoolean()
  isWithdraw: boolean;

  @ApiProperty({
    description: 'Quantidade de pontos que o usuário ganhou ou resgatou',
    example: 10
  })
  @IsInt()
  pointAmount: number;
}
