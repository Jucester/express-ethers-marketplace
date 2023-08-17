import IResponse from './IResponse';

/**
 * The last methods as optionals just for the sake of avoid the implementation in this demo
 */
export interface IService {
  findAll(params: object): Promise<IResponse>;
  findById(id: string): Promise<IResponse>;
  create?(body: any): Promise<IResponse>;
  updateById?(id: string | number, source: any): Promise<IResponse>;
  deleteById?(id: string): Promise<IResponse>;
}
