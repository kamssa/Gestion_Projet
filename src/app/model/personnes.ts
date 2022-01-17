
export class Personne {
  constructor(
    public id?: number,
    public  version?: number,
    public name?: string,
    public usename?: string,
    public email?: string,
    public password?: string,
    public type?: string,
    public roles?: []
  ) {
  }
}
