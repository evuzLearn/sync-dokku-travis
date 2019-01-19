export class Activity {
  id?: string;
  concept: string;
  amount: number;
  userId: string | number;
  date?: number;

  constructor({ concept, amount, date, userId }: Partial<Activity>) {
    this.userId = userId;
    this.concept = concept;
    this.amount = amount;
    this.date = date;
  }
}
