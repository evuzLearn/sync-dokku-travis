import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';
import { Activity as ActivityEntity } from '../../Entities/Activity';

@Entity()
export class Activity extends ActivityEntity {
  @ObjectIdColumn()
  id?: ObjectID;
  @Column()
  concept: string;
  @Column()
  amount: number;
  @Column()
  date?: number;

  constructor(activity: Activity = <any>{}) {
    super(activity);
  }
}
