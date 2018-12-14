import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id?: ObjectID;
  @Column()
  firstName: string;
  @Column()
  lastName?: string;
  @Column()
  age?: number;

  constructor({firstName, lastName, age}: User = <any>{}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  } 
}
