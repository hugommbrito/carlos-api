import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CourseRepositoryInterface } from '../course.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/domain.courses/entity/course.entity';
import { CourseDomain } from 'src/domain.courses/domains/course.domain';
import { CourseMapper } from 'src/domain.courses/mappers/course.mappers';

@Injectable()
export class CourseRepository implements CourseRepositoryInterface {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  async create(course: CourseDomain): Promise<CourseDomain> {
    try {
      const courseProps = CourseMapper.DomainToPersistence(course);
      console.log(courseProps);
      const entity = this.courseRepository.create({ ...courseProps, modules: [] });
      const persistedOrError = await this.courseRepository.save(entity);

      if (persistedOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          { description: 'Erro ao persistir o curso no DB', cause: 'course.repository-create-try' }
        );

      return CourseMapper.EntityToDomain(persistedOrError);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Erro ao persistir o curso no DB', cause: 'course.repository-create-catch' }
      );
    }
  }

  async update(id: number, course: CourseDomain): Promise<CourseDomain> {
    try {
      const courseToUpdate = await this.courseRepository.findOne({ where: { id } });
      if (!courseToUpdate) return null;

      const courseProps = CourseMapper.DomainToPersistence(course);
      const { modules, ...updatableProps } = courseProps;

      const updatedCourseOrError = await this.courseRepository.update(id, updatableProps);
      if (updatedCourseOrError instanceof Error)
        throw new InternalServerErrorException(
          {},
          {
            description: 'Erro ao atualizar o curso no DB',
            cause: 'course.repository-update-try'
          }
        );

      const updatedCourse = await this.courseRepository.findOne({ where: { id } });

      return CourseMapper.EntityToDomain(updatedCourse);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        {},
        { description: 'Erro ao atualizar o curso no DB', cause: 'course.repository-update-catch' }
      );
    }
  }

  async findById(id: number): Promise<CourseDomain> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) return null;

    return CourseMapper.EntityToDomain(course);
  }

  async findAll(): Promise<CourseDomain[]> {
    const courses = await this.courseRepository.find({
      relations: ['modules', 'modules.lectures']
    });
    if (!courses) return null;

    return courses.map((course) => CourseMapper.EntityToDomain(course));
  }

  async remove(id: number): Promise<void> {
    const courseToRemove = await this.courseRepository.findOne({ where: { id } });

    if (!courseToRemove)
      throw new NotFoundException({}, { description: 'Curso não encontrado', cause: 'course.repository-remove' });

    await this.courseRepository.softRemove(courseToRemove);
  }
}
