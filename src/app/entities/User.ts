export class User {
  constructor(
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public country: string,
    public password: string,
    public id?: number,
    public isActive?: boolean,
    public balance?: number
  ) {}
}
