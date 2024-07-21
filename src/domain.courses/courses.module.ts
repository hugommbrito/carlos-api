import { Module } from '@nestjs/common';
import { CourseController } from './usecases/course/CRUD/course.controller';
import { CourseService } from './usecases/course/CRUD/course.service';
import { ModuleService } from './usecases/module/CRUD/module.service';
import { ModuleController } from './usecases/module/CRUD/module.controller';
import { LectureController } from './usecases/lecture/CRUD/lecture.controller';
import { LectureService } from './usecases/lecture/CRUD/lecture.service';

import { ModuleRepository } from './repository/typeorm/module.repository';
import { LectureRepository } from './repository/typeorm/lecture.repository';
import { CourseRepository } from './repository/typeorm/course.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Lecture } from './entity/lecture.entity';
import { Module as ModuleEntity } from './entity/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, ModuleEntity, Lecture])],
  controllers: [CourseController, ModuleController, LectureController],
  providers: [
    CourseService,
    ModuleService,
    LectureService,
    {
      provide: 'course_repository',
      useClass: CourseRepository
    },
    {
      provide: 'module_repository',
      useClass: ModuleRepository
    },
    {
      provide: 'lecture_repository',
      useClass: LectureRepository
    }
  ]
})
export class CoursesModule {}
