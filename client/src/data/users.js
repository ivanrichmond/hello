// TODO: This is scaffolded, so I can concentrate on front-end.  Redo when I have real back-end.
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getUsers(query) {
  await fakeNetwork(`getUsers:${query}`);
  let users = await localforage.getItem("users");
  if (!users) users = [];
  if (query) {
    users = matchSorter(users, query, { keys: ["name"] });
  }
  return users.sort(sortBy("name", "createdAt"));
}

export async function createUser() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let user = { id, createdAt: Date.now() };
  let users = await getUsers();
  users.unshift(user);
  await set(users);
  return user;
}

export async function getUser(id) {
  await fakeNetwork(`user:${id}`);
  let users = await localforage.getItem("users");
  if(!users) return null;
  let user = users.find(user => user.id === id);
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
