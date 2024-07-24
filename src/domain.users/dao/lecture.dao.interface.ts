export interface LectureDaoInterface {
  findById(id: number): Promise<any>;
}