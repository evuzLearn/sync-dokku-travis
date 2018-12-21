import { User } from '../Entities/User';

export interface UsersRepository {
  getAllUsers: () => Promise<User[]>;
  newUser: (args: { user: User }) => Promise<User>;
}
