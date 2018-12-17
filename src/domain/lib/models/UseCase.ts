import { IService } from './Service';

export interface IUseCase {
  execute: (args?: any) => Promise<any>;
}
