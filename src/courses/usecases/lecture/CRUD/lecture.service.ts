import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ILectureDomain, ILectureInput, LectureDomain } from '../../../domains/lecture.domain';
import { LectureRepositoryInterface } from '../../../repository/lecture.repository.interface';
import { LectureMapper } from '../../../mappers/lecture.mappers';

@Injectable()
export class LectureService {
  constructor(
    @Inject('lecture_repository')
    private readonly lectureRepository: LectureRepositoryInterface
  ) {}

  async create(data: ILectureInput): Promise<ILectureDomain> {
    const lectureDomain = LectureDomain.create(data);

    const lecturePersisted = await this.lectureRepository.create(lectureDomain);

    return LectureMapper.EntityOrDomainToReturn(lecturePersisted);
  }

  async findAll(): Promise<ILectureDomain[]> {
    const lectureDomainList = await this.lectureRepository.findAll();
    if (!lectureDomainList)
      throw new NotFoundException(
        {},
        { description: 'No lectures found', cause: 'lecture-service' }
      );

    return lectureDomainList.map((lecture) => LectureMapper.EntityOrDomainToReturn(lecture));
  }

  async findById(id: number): Promise<ILectureDomain> {
    const lectureDomain = await this.lectureRepository.findById(id);
    if (!lectureDomain)
      throw new NotFoundException(
        {},
        { description: 'Lecture not found', cause: 'lecture-service' }
      );

    return LectureMapper.EntityOrDomainToReturn(lectureDomain);
  }

  async update(id: number, data: Partial<ILectureInput>): Promise<ILectureDomain> {
    const lectureDomain = await this.lectureRepository.findById(id);
    if (!lectureDomain)
      throw new NotFoundException(
        {},
        { description: 'Lecture not found', cause: 'lecture-service' }
      );

    lectureDomain.updateSelf(data);

    const lectureUpdated = await this.lectureRepository.update(id, lectureDomain);

    return LectureMapper.EntityOrDomainToReturn(lectureUpdated);
  }

  async remove(id: number): Promise<void> {
    await this.lectureRepository.remove(id);
  }
}

