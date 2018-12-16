import { Service } from './Service';

export interface UseCase {
  service: Service;
  execute: () => Promise<any>;
}
