import { MethodNotAllowedException } from "@nestjs/common";
import { IModuleDomain, ModuleDomain } from "./module.domain";
import { Module } from "../entity/module.entity";


export class LectureDomain {
  private readonly props: ILectureDomain;

  constructor(inputProps: ILectureInput, id?: number, createdAt?: Date, updatedAt?: Date, deletedAt?: Date | null) {
    const now = new Date();
    this.props = {
      ...inputProps,
      id: id || undefined,
      createdAt: createdAt || now,
      updatedAt: updatedAt || now,
      deletedAt: deletedAt || null
    };
    this.validate();
  }

  static create(inputProps: ILectureInput): LectureDomain {
    return new LectureDomain(inputProps);
  }

  static load(props: ILectureDomain): LectureDomain {
    return new LectureDomain(props, props.id, props.createdAt, props.updatedAt, props.deletedAt);
  }

  public updateSelf(props: Partial<ILectureInput>): void {
    Object.keys(props).forEach((propKey) => {
      if (
        propKey === 'id' ||
        propKey === 'createdAt' ||
        propKey === 'updatedAt' ||
        propKey === 'deletedAt' ||
        propKey === 'moduleId' ||
        propKey === 'module' ||
        propKey === 'order' ||
        propKey === 'isActive'
      ){
        throw new MethodNotAllowedException(
          {},
          {
            description: `${propKey} não pode ser atualizado por este método`,
            cause: 'lecture.domain-updateSelf'
          }
        )
      }
      this.props[propKey] = props[propKey];
      this.validate()
    })
  }

  private validate(): void {
    if (!this.props.name) throw new Error('Name is required');
    if (!this.props.youtubeEmbedId) throw new Error('Video URL is required');
    if (!this.props.documentsURLs) throw new Error('Documents URLs are required');
    if (!this.props.order) throw new Error('Order is required');
    // if (!this.props.module) throw new Error('Module is required');
  }

  public getAllPropsCopy(): ILectureDomain {
    return Object.freeze({ ...this.props });
  }

  public getPropsCopy(): ILectureDomain {
    const { deletedAt, ...otherProps } = this.props;
    return Object.freeze(otherProps);
  }

  public getUpdatablePropsCopy(): Omit<ILectureInput, 'moduleId' | 'module'> {
    const { id, module, moduleId, createdAt, updatedAt, deletedAt, ...otherProps } = this.props;
    return Object.freeze(otherProps);
  }

  public switchActiveStatus(): void {
    this.props.isActive = !this.props.isActive;
  }
  
}

export interface ILectureDomain extends ILectureInput {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

}

export interface ILectureInput {
  name: string;
  description?: string;
  youtubeEmbedId: string;
  documentsURLs: string[];
  order: number;
  isActive: boolean;
  moduleId?: number;
  module?: IModuleDomain | Module;
}