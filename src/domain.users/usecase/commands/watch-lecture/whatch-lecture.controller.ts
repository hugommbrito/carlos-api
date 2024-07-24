import { Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { WatchLectureUseCase } from "./watch-lecture.usecase";
import { AuthGuard } from "src/domain.users/auth/guards/auth.guard";


@Controller('users/self/watch-lecture')
@ApiTags('Usuários')
export class WatchLectureController {
  constructor(
    private readonly watchLectureUseCase: WatchLectureUseCase
  ) {}

  @ApiOperation({ summary: 'Marcar aula como concluida/pendente pelo usuário' })
  @ApiOkResponse({ status: 200, description: 'Aula marcada como concluída/pendente com sucesso' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/:lectureId')
  async watchLecture(
    @Req()
    request: {
      user: { sub: string }
    },
    @Param('lectureId')
    lectureId: number
  ) {

    const result = await this.watchLectureUseCase.execute(request.user.sub, lectureId)

    return result
  }
}