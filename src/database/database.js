import Dexie from "dexie";

export const db = new Dexie("myDatabase");

export const dbData = db.version(1).stores({
  users: "++id, &name, password",
  messages: "++id, user_id, title, content",
});



export async function addUser(name, password) {
  try {
    await db.users.add({ name, password });
  } catch (error) {
    console.log(error);
  }
}

export async function addComment(user_id, title, content) {
  try {
    await db.messages.add({ user_id, title, content });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUsers() {
  const allUsers = await db.users.toArray();
  console.log(allUsers);
  return allUsers
}

export async function fetchComments() {
  const messagesAll = await db.messages.toArray();
  console.log(messagesAll);
  return messagesAll
}

export async function dataUpload(){
  let messagesDB = await fetchComments();
  let message = {};

  messagesDB.forEach((m) => {
    if (Object.hasOwn(message, m.user_id))
      message[m.user_id] = message[m.user_id].concat(m);
    else message[m.user_id] = [m];
  });

  const data = await db.users.toArray().then((allUsers) => {
    const userData = allUsers.map((user) => {
      if(message[user.id] == undefined) {
        return {
          name: user.name,
          password: user.password,
          messages: [],
        }
      }
      return {
        name: user.name,
        password: user.password,
        messages: message[user.id],
      };
    });
    return userData;
  });

  return data
}

export async function usersUpload() {
  let usersDB = await fetchUsers();
  
  usersDB = usersDB.map((user) => {
    return user["name"];
  });

  return usersDB
}