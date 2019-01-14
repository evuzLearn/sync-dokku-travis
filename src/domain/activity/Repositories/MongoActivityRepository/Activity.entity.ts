import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';
import { Activity as ActivityEntity } from '../../Entities/Activity';

@Entity()
export class Activity extends ActivityEntity {
  @ObjectIdColumn()
  private _id: ObjectID;
  @Index()
  @Column()
  userId: string | number;
  @Column()
  concept: string;
  @Column()
  amount: number;
  @Column()
  date?: number;

  get id() {
    return this._id.toString();
  }

  constructor(activity: Activity = <any>{}) {
    super(activity);
  }
}
