import { Inject, NotFoundException } from "@nestjs/common";
import { LectureRepositoryInterface } from "../../../../domain.courses/repository/lecture.repository.interface";
import { LectureDaoInterface } from "../../../../domain.users/dao/lecture.dao.interface";
import { LectureDao } from "../../../../domain.users/dao/typeorm/lecture.dao";
import { UserRepositoryInterface } from "../../../../domain.users/repository/user.repository.interface";

export class WatchLectureUseCase {
  constructor(
    @Inject('user_repository')
    private readonly userRepository: UserRepositoryInterface,

    @Inject('lecture_dao')
    private readonly LectureDao: LectureDao

  ){}

  async execute(userId: string, lectureId: number): Promise<any> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException({}, { description: 'Usuário não encontrado', cause: 'watch-lecture.usecase' });
    }

    const lecture = await this.LectureDao.findById(lectureId);
    if (!lecture) {
      throw new NotFoundException({}, { description: 'Aula não encontrada', cause: 'watch-lecture.usecase' });
    }

    
    const operation = user.updateWatchedLectures(lecture.getPropsCopy())

    await this.userRepository.saveCreate(user);

    return { message: `Aula marcada como ${operation ? 'CONCLUÍDA' : 'PENDENTE'}` };
  }
}