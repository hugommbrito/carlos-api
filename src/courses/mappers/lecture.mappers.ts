import { ILectureDomain, LectureDomain } from "../domains/lecture.domain";
import { Lecture } from "../entity/lecture.entity";

export class LectureMapper {
  static EntityToDomain(lectureEntity: Lecture): LectureDomain {
    return LectureDomain.load({...lectureEntity})
  }

  static DomainToPersistence(lectureDomain: LectureDomain): ILectureDomain {
    return {...lectureDomain.getPropsCopy()}
  }

  static EntityOrDomainToReturn(lectureEntityOrDomain: Lecture | LectureDomain | ILectureDomain): ILectureDomain {
    if (lectureEntityOrDomain instanceof LectureDomain){
      return lectureEntityOrDomain.getPropsCopy()
    }

    if (lectureEntityOrDomain instanceof Lecture ){
      delete lectureEntityOrDomain.deletedAt
      return lectureEntityOrDomain
    }
  }
}

