export class Activity {
  concept: string;
  amount: number;
  date?: number;

  constructor({ concept, amount, date }: Activity) {
    this.concept = concept;
    this.amount = amount;
    this.date = date;
  }
}
