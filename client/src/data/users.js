export let nextUserId = 6
export class User {
  constructor(
    id,
    name = '',
    username = '',
    password = '',
    createdAt = Date.now()
  ){
    this.createdAt = createdAt
    this.id = id
    this.name = name
    this.password = password
    this.username = username
  }
}

export function createUser() {
  // let id = Math.random().toString(36).substring(2, 9);
  let user = new User(nextUserId, '', '', '', Date.now())
  nextUserId++
  return user
}
