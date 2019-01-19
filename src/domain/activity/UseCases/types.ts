import { IService } from 'ts-domain';

import { Activity } from '../Entities/Activity';

export interface IActivityUseCase {
  service: IService;
}

export interface INewExpenseUseCase extends IActivityUseCase {}
export interface INewIncomeUseCase extends IActivityUseCase {}
export interface IGetActivitiesByUserIdUseCase extends IActivityUseCase {}
export interface IGetActivitiesByMonthUseCase extends IActivityUseCase {}
export interface IGetActivitiesByMonthPaginatedUseCase extends IActivityUseCase {}
