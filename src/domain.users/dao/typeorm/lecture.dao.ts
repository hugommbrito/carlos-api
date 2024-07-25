import { InjectRepository } from "@nestjs/typeorm";
import { LectureDaoInterface } from "../lecture.dao.interface";
import { Repository } from "typeorm";
import { Lecture } from "../../../domain.courses/entity/lecture.entity";
import { LectureMapper } from "../../../domain.courses/mappers/lecture.mappers";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LectureDao implements LectureDaoInterface {
  constructor (
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>
  ) {}

  async findById(id: number): Promise<any> {
    const lecture = await this.lectureRepository.findOne({where: {id}})
    return LectureMapper.EntityToDomain(lecture)
  }
}