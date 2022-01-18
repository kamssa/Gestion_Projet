
export class Personne {
  constructor(
    public id?: number,
    public  version?: number,
    public email?: string,
    public telephone?: string,
    public password?: string,
    public type?: string,
    public roles?: []
  ) {
  }
}
