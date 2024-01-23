// TODO: This is scaffolded, so I can concentrate on front-end.  
// Redo when I have real back-end.
// TODO: Redo everything with just Redux, and not localforage.
// Check other files for reliance on localforage, but I think this is the only
// one.
import localforage from "localforage";
// import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

import store from '../data/store'

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

const state = store.getState()

// TODO: Add Redux query.
export async function getUsers() {
  const users = state.users.users || []
  return users.sort(sortBy("name", "createdAt"));
}

export function createUser() {
  // let id = Math.random().toString(36).substring(2, 9);
  let user = new User(nextUserId)
  nextUserId++
  return user
}

export async function getUser(id) {
  await fakeNetwork(`user:${id}`);
  let users = await localforage.getItem("users");
  if(!users) return null;
  let user = users.find(user => user.id === id);
  return user ?? null;
}

export async function getUserByUsername(username) {
  await fakeNetwork(`user:${username}`);
  let users = await localforage.getItem("users");
  if(!users) return null;
  let user = users.find(user => user.username === username);
  return user ?? null;
}

export async function updateUser(id, updates) {
  await fakeNetwork();
  let users = await localforage.getItem("users");
  let user = users.find(user => user.id === id);
  if (!user) throw new Error("No user found for", id);
  Object.assign(user, updates);
  await set(users);
  return user;
}

export async function deleteUser(id) {
  let users = await localforage.getItem("users");
  let index = users.findIndex(user => user.id === id);
  if (index > -1) {
    users.splice(index, 1);
    await set(users);
    return true;
  }
  return false;
}

/**
 * @param {string} username
 * @param {string} password
 * @return {User} user object on success; false on failure
 */
export async function validateUser(username, password) {
  if(!username || !password) {
    console.error(`Bad parameters passed to validateUser()`)
    return false
  }

  const user = await getUserByUsername(username)

  if(user && user.password === password){
    return user
  } else {
    return false
  }
}

// Helper Functions
function set(users) {
  return localforage.setItem("users", users);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
