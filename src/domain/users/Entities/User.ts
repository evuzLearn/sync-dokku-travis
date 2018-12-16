export class User {
  firstName: string;
  lastName?: string;
  age?: number;

  constructor({ firstName, lastName, age }: User) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
