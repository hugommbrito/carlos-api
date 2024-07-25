import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
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
} from '@nestjs/swagger'
import { AuthGuard } from '../../../../domain.users/auth/guards/auth.guard'
import { RoleGuard } from '../../../../domain.users/auth/guards/roles.guard'
import { Roles } from '../../../../domain.users/auth/rolesConfig/role.decorator'
import { Role } from '../../../../domain.users/auth/rolesConfig/role.enum'
import { CourseService } from './course.service'
import { CreateCourseDto, UpdateCourseDto } from './course.dto'

@Controller('course')
@ApiTags('Curso')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Criar um novo curso' })
  @ApiCreatedResponse({ status: 201, description: 'Curso criado com sucesso' })
  @ApiBadRequestResponse({ status: 400, description: 'Erro por requisição mal formatada ou campos inválidos' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('')
  async create(
    @Body()
    data: CreateCourseDto
  ) {
    const isActive = data.isActive ?? true
    const result = await this.courseService.create({ ...data, isActive })
    return { message: `Curso ${result.name} criado com sucesso!`, course: result }
  }

  @ApiOperation({ summary: 'Listar todos os cursos' })
  @ApiOkResponse({ status: 200, description: 'Cursos listados com sucesso' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('')
  async findAll() {
    const result = await this.courseService.findAll()
    return result
  }

  @ApiOperation({ summary: 'Buscar um curso pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Curso encontrado com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Curso não encontrado' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(
    @Param('id')
    id: number
  ) {
    const result = await this.courseService.findById(id)
    return result
  }

  @ApiOperation({ summary: 'Atualizar um curso pelo ID' })
  @ApiOkResponse({ status: 200, description: 'Curso atualizado com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Curso não encontrado' })
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
    data: UpdateCourseDto
  ) {
    const result = await this.courseService.update(id, data)
    return { message: `Curso ${result.name} atualizado com sucesso!`, course: result }
  }

  @ApiOperation({ summary: 'Remover um curso pelo ID' })
  @ApiNoContentResponse({ status: 204, description: 'Curso removido com sucesso' })
  @ApiNotFoundResponse({ status: 404, description: 'Curso não encontrado' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async remove(
    @Param('id')
    id: number
  ) {
    await this.courseService.remove(id)
  }
}
