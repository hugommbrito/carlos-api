import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '../../../../domain.users/auth/guards/auth.guard';
import { RoleGuard } from '../../../../domain.users/auth/guards/roles.guard';
import { Roles } from '../../../../domain.users/auth/rolesConfig/role.decorator';
import { Role } from '../../../../domain.users/auth/rolesConfig/role.enum';
import { CreateLectureDto, UpdateLectureDto } from './lecture.dto';
import { LectureService } from './lecture.service';

@ApiTags('Aulas')
@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @ApiOperation({ summary: 'Criar uma nova aula' })
  @ApiCreatedResponse({ status: 201, description: 'Palestra criada com sucesso' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('')
  async create(
    @Body()
    data: CreateLectureDto
  ) {
    const result = await this.lectureService.create({ ...data, isActive: true });
    return { message: `Palestra ${result.name} criada com sucesso!`, lecture: result };
  }

  @ApiOperation({ summary: 'Listar todas as palestras' })
  @ApiOkResponse({ status: 200, description: 'Palestras listadas com sucesso' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('')
  async findAll() {
    const result = await this.lectureService.findAll();
    return result;
  }

  @ApiOperation({ summary: 'Buscar uma palestra pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Palestra encontrada com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Palestra não encontrada' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(
    @Param('id')
    id: number
  ) {
    const result = await this.lectureService.findById(id);
    return result;
  }

  @ApiOperation({ summary: 'Atualizar uma palestra pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Palestra atualizada com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Palestra não encontrada' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id')
    id: number,
    @Body()
    data: UpdateLectureDto
  ) {
    const result = await this.lectureService.update(id, data);
    return { message: `Palestra ${result.name} atualizada com sucesso!`, lecture: result };
  }

  @ApiOperation({ summary: 'Remover uma palestra pelo ID' })
  @ApiNoContentResponse({ status: 204, description: 'Palestra removida com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Palestra não encontrada' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async remove(
    @Param('id')
    id: number
  ) {
    await this.lectureService.remove(id);
  }
}
