import { CourseDomain } from '../domains/course.domain'

export interface CourseRepositoryInterface {
  create(course: CourseDomain): Promise<CourseDomain>
  findAll(): Promise<CourseDomain[]>
  findById(id: number): Promise<CourseDomain>
  update(id: number, course: CourseDomain): Promise<CourseDomain>
  remove(id: number): Promise<void>
}
