import { CourseDomain, ICourseDomain } from '../domains/course.domain';
import { Course } from '../entity/course.entity';

export class CourseMapper {
  static EntityToDomain(courseEntity: Course): CourseDomain {
    return CourseDomain.load({ ...courseEntity });
  }

  static DomainToPersistence(courseDomain: CourseDomain): ICourseDomain {
    return { ...courseDomain.getAllPropsCopy() };
  }

  static EntityOrDomainToReturn(courseEntityOrDomain: Course | CourseDomain | ICourseDomain): ICourseDomain {
    if (courseEntityOrDomain instanceof CourseDomain) {
      return courseEntityOrDomain.getAllPropsCopy();
    }

    if (courseEntityOrDomain instanceof Course) {
      delete courseEntityOrDomain.deletedAt;
      return courseEntityOrDomain;
    }
  }
}
