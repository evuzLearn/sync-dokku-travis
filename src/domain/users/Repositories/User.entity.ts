import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { User as UserEntity } from '../Entities/User';

@Entity()
export class User extends UserEntity {
  @ObjectIdColumn()
  id?: ObjectID;
  @Column()
  firstName: string;
  @Column()
  lastName?: string;
  @Column()
  age?: number;

  constructor(user: User = <any>{}) {
    super(user);
  }
}
