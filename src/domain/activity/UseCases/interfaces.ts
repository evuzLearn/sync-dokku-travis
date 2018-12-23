import { IService } from '../../lib/models/Service';
import { Activity } from '../Entities/Activity';

export interface IActivityUseCase {
  service: IService;
}

export interface INewActivityUseCase extends IActivityUseCase {}
export interface IGetActivitiesUseCase extends IActivityUseCase {}
