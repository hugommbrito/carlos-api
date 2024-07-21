import { MethodNotAllowedException } from '@nestjs/common';
import { ILectureDomain, LectureDomain } from './lecture.domain';
import { Course } from '../entity/course.entity';
import { ICourseDomain } from './course.domain';
import { Lecture } from '../entity/lecture.entity';

export class ModuleDomain {
  private readonly props: IModuleDomain;

  constructor(
    inputProps: IModuleInput,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null,
    lectures?: LectureDomain[] | Lecture[]
  ) {
    const now = new Date();
    this.props = {
      ...inputProps,
      id: id || undefined,
      createdAt: createdAt || now,
      updatedAt: updatedAt || now,
      deletedAt: deletedAt || null,
      lectures: lectures || []
    };
    this.validate();
  }

  static create(inputProps: IModuleInput): ModuleDomain {
    return new ModuleDomain(inputProps);
  }

  static load(props: IModuleDomain): ModuleDomain {
    return new ModuleDomain(props, props.id, props.createdAt, props.updatedAt, props.deletedAt, props.lectures);
  }

  public updateSelf(props: Partial<IModuleInput>): void {
    Object.keys(props).forEach((propKey) => {
      if (
        propKey === 'id' ||
        propKey === 'createdAt' ||
        propKey === 'updatedAt' ||
        propKey === 'deletedAt' ||
        propKey === 'lectures' ||
        propKey === 'courseId' ||
        propKey === 'course' ||
        propKey === 'order' ||
        propKey === 'isActive'
      ) {
        throw new MethodNotAllowedException(
          {},
          {
            description: `${propKey} não pode ser atualizado por este método`,
            cause: 'module.domain-updateSelf'
          }
        );
      }
      this.props[propKey] = props[propKey];
      this.validate();
    });
  }

  private validate(): void {
    if (!this.props.name) throw new Error('Name is required');
    if (!this.props.order) throw new Error('Order is required');
    // if (!this.props.course) throw new Error('Course is required')
  }

  public getAllPropsCopy(): IModuleDomain {
    return Object.freeze({ ...this.props });
  }

  public getPropsCopy(): IModuleDomain {
    const { deletedAt, ...otherProps } = this.props;
    return Object.freeze(otherProps);
  }

  public switchActiveStatus(): void {
    this.props.isActive = !this.props.isActive;
  }
}

export interface IModuleDomain extends IModuleInput {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  lectures: LectureDomain[] | Lecture[];
}

export interface IModuleInput {
  name: string;
  order: number;
  isActive: boolean;
  courseId?: number;
  course?: ICourseDomain | Course;
}
