export class User {
  userId: number;
  firstName: string;
  username?: string;

  constructor({ firstName, username, userId }: User) {
    this.userId = userId;
    this.firstName = firstName;
    this.username = username;
  }
}
