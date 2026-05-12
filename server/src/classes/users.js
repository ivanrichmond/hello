//@flow
export class User {
  createdAt: number;
  name: string;
  username: string;
  password: string; 
  constructor(
    name: string = '',
    username: string = '',
    password: string = '',
  ){
    this.createdAt = Date.now()
    this.name = name
    this.password = password
    this.username = username
  }
}