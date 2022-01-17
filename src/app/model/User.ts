export class User {
  constructor(public id?: number,
              public version?: number,
              public name?: string,
              public username?: string,
              public email?: string,
              public password?: string,
              public type?: string) {
  }
}
