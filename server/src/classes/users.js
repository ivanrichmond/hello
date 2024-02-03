export class User {
  constructor(
    name = '',
    username = '',
    password = '',
  ){
    this.createdAt = Date.now()
    this.name = name
    this.password = password
    this.username = username
  }
}