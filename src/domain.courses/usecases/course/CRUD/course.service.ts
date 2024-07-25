import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepositoryInterface } from '../../../repository/course.repository.interface';
import { ICourseDomain, ICourseInput, CourseDomain } from '../../../domains/course.domain';
import { CourseMapper } from '../../../mappers/course.mappers';
import { CourseRepository } from '../../../../domain.courses/repository/typeorm/course.repository';

@Injectable()
export class CourseService {
  constructor(
    @Inject('course_repository')
    private readonly courseRepository: CourseRepository
  ) {}

  async create(data: ICourseInput): Promise<ICourseDomain> {
    const courseDomain = CourseDomain.create(data);

    const coursePersisted = await this.courseRepository.create(courseDomain);

    return CourseMapper.EntityOrDomainToReturn(coursePersisted);
  }

  async findAll(): Promise<ICourseDomain[]> {
    const courseDomainList = await this.courseRepository.findAll();
    if (!courseDomainList)
      throw new NotFoundException({}, { description: 'Nenhum Curso encontrado', cause: 'course.service' });

    return courseDomainList.map((course) => CourseMapper.EntityOrDomainToReturn(course));
  }

  async findById(id: number): Promise<ICourseDomain> {
    const courseDomain = await this.courseRepository.findById(id);
    if (!courseDomain)
      throw new NotFoundException({}, { description: 'Curso não encontrado', cause: 'course.service' });

    return CourseMapper.EntityOrDomainToReturn(courseDomain);
  }

  async update(id: number, data: Partial<ICourseInput>): Promise<ICourseDomain> {
    const courseDomain = await this.courseRepository.findById(id);
    if (!courseDomain)
      throw new NotFoundException({}, { description: 'Curso não encontrado', cause: 'course.service' });

    courseDomain.updateSelf(data);

    const courseUpdated = await this.courseRepository.update(id, courseDomain);

    return CourseMapper.EntityOrDomainToReturn(courseUpdated);
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.remove(id);
  }
}
