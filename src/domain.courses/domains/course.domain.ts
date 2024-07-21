import { MethodNotAllowedException } from '@nestjs/common';
import { Module } from '../entity/module.entity';
import { IModuleDomain } from './module.domain';

export class CourseDomain {
  private readonly props: ICourseDomain;

  constructor(inputProps: ICourseInput, id?: number, createdAt?: Date, updatedAt?: Date, deletedAt?: Date | null) {
    const now = new Date();
    this.props = {
      ...inputProps,
      id: id || Number(Math.random().toFixed(1)) * 10,
      createdAt: createdAt || now,
      updatedAt: updatedAt || now,
      deletedAt: deletedAt || null
    };
    this.validate();
  }

  static create(inputProps: ICourseInput): CourseDomain {
    return new CourseDomain(inputProps);
  }

  static load(props: ICourseDomain): CourseDomain {
    return new CourseDomain(props, props.id, props.createdAt, props.updatedAt, props.deletedAt);
  }

  public updateSelf(props: Partial<ICourseInput>): void {
    Object.keys(props).forEach((propKey) => {
      if (
        propKey === 'id' ||
        propKey === 'createdAt' ||
        propKey === 'updatedAt' ||
        propKey === 'deletedAt' ||
        propKey === 'modules' ||
        propKey === 'order' ||
        propKey === 'isActive'
      ) {
        throw new MethodNotAllowedException(
          {},
          {
            description: `${propKey} não pode ser atualizado por este método`,
            cause: 'course.domain-updateSelf'
          }
        );
      }
      this.props[propKey] = props[propKey];
      this.validate();
    });
  }

  private validate(): void {
    if (!this.props.name) throw new Error('Name is required');
    if (!this.props.description) throw new Error('Description is required');
    if (!this.props.order) throw new Error('Order is required');
  }

  public getAllPropsCopy(): ICourseDomain {
    return Object.freeze({ ...this.props });
  }

  public getPropsCopy(): ICourseDomain {
    const { deletedAt, ...otherProps } = this.props;
    return Object.freeze(otherProps);
  }

  public switchActiveStatus(): void {
    this.props.isActive = !this.props.isActive;
  }
}

export interface ICourseDomain extends ICourseInput {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  modules?: IModuleDomain[] | Module[];
}

export interface ICourseInput {
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  introductionEmbedVideoId?: string;
  coverImgUrl: string;
}
