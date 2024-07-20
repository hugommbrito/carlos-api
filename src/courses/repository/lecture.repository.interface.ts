import { LectureDomain } from '../domains/lecture.domain'

export interface LectureRepositoryInterface {
  create(lecture: LectureDomain): Promise<LectureDomain>
  findAll(): Promise<LectureDomain[]>
  findById(id: number): Promise<LectureDomain>
  update(id: number, lecture: LectureDomain): Promise<LectureDomain>
  remove(id: number): Promise<void>
}
