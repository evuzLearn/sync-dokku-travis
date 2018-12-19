import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';
import { User as UserEntity } from '../Entities/User';

@Entity()
export class User extends UserEntity {
  @ObjectIdColumn()
  id?: ObjectID;
  @Column()
  @Index({ unique: true })
  userId: number;
  @Column()
  firstName: string;
  @Column()
  username?: string;

  constructor(user: User = <any>{}) {
    super(user);
  }
}
