import { IService } from '../../lib/models/Service';
import { Activity } from '../Entities/Activity';

export interface IActivityUseCase {
  service: IService;
}

export interface INewExpenseUseCase extends IActivityUseCase {}
export interface INewIncomeUseCase extends IActivityUseCase {}
export interface IGetActivitiesUseCase extends IActivityUseCase {}
