import { Domain } from './lib/domain';
import { UsersUseCaseFactory } from './users/UseCases/factory';

export function init () {
  const useCases = {
    get_all_users: UsersUseCaseFactory.getAllUsersUseCase(),
  };
  
  return new Domain({ useCases });
}
