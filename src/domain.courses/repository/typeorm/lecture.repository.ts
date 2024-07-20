import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LectureRepositoryInterface } from '../lecture.repository.interface';
import { Lecture } from 'src/domain.courses/entity/lecture.entity';
import { LectureDomain } from 'src/domain.courses/domains/lecture.domain';
import { LectureMapper } from 'src/domain.courses/mappers/lecture.mappers';
import { Module } from 'src/domain.courses/entity/module.entity';

@Injectable()
export class LectureRepository implements LectureRepositoryInterface {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>
  ) {}

  async create(lecture: LectureDomain): Promise<LectureDomain> {
    try {
      const lectureProps = LectureMapper.DomainToPersistence(lecture);
      const module: Module = await this.moduleRepository.findOne({ where: { id: lectureProps.moduleId } });

      const lectureEntity = this.lectureRepository.create({ ...lectureProps, module: module });
      const persistedLectureOrError = await this.lectureRepository.save(lectureEntity);

      if (persistedLectureOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          { description: 'Error while persisting lecture in DB', cause: 'lecture-repository-try' }
        );

      return LectureMapper.EntityToDomain(persistedLectureOrError);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Error while persisting lecture in DB', cause: 'lecture-repository-catch' }
      );
    }
  }

  async update(id: number, lecture: LectureDomain): Promise<LectureDomain> {
    try {
      const lectureToUpdate = await this.lectureRepository.findOne({ where: { id: id } });
      if (!lectureToUpdate) return null;

      const lectureProps = LectureMapper.DomainToPersistence(lecture);
      const { module, moduleId, ...updatableProps } = lectureProps;

      const updatedLectureOrError = await this.lectureRepository.update(id, { ...updatableProps });
      if (updatedLectureOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          { description: 'Error while updating lecture in DB', cause: 'lecture-repository-try' }
        );

      const updatedLecture = await this.lectureRepository.findOne({ where: { id: id } });

      return LectureMapper.EntityToDomain(updatedLecture);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Error while updating lecture in DB', cause: 'lecture-repository-catch' }
      );
    }
  }

  async findById(id: number): Promise<LectureDomain> {
    const lecture = await this.lectureRepository.findOne({ where: { id: id } });
    if (!lecture) return null;

    return LectureMapper.EntityToDomain(lecture);
  }

  async findAll(): Promise<LectureDomain[]> {
    const lectures = await this.lectureRepository.find();
    if (!lectures) return null;

    return lectures.map((lecture) => LectureMapper.EntityToDomain(lecture));
  }

  async remove(id: number): Promise<void> {
    const lectureToRemove = await this.lectureRepository.findOne({ where: { id: id } });

    if (!lectureToRemove)
      throw new NotFoundException({}, { description: 'Lecture not found', cause: 'lecture-repository-remove' });

    await this.lectureRepository.remove(lectureToRemove);
  }
}
