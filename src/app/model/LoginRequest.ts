export class LoginRequest {
  constructor(
    public emailOrTelephone: string,
    public password: string,
    public  type: string)
  {
  }
}
