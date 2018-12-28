import { IService } from 'ts-domain';

interface IUserUseCase {
  service: IService;
}

export interface IGetAllUsersUseCase extends IUserUseCase {}

export interface INewUserUseCase extends IUserUseCase {}
