import { ActivityRepository } from '../Repositories/ActivityRepository';

export interface IActivityService {
  repository: ActivityRepository;
}

export interface INewExpense extends IActivityService {}
export interface IGetActivitiesByUserId extends IActivityService {}
