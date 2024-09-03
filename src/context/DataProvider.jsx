import { createContext, useContext, useEffect, useState } from "react";
import { dataUpload, db, usersUpload } from "../database/database";
db;
const DataContext = createContext({
  assets: [],
  loading: false,
  users: [],
  sortedUsers: [],
});

export function DataProviderContext({ children }) {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredUser, setRegisteredUser] = useState(
    "Пользователь не зарегестрирован"
  );
  const [registeredUserMessages, setRegisteredUserMessages] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const users = await usersUpload();
      const data = await dataUpload();

      setUsers(users);
      setSortedUsers(users);
      setAssets(data);
      setLoading(false);
    }, 1);
  }, []);

  function AddAssets(values) {
    const users = assets.find((user) => {
      return user.name == values.name;
    });
    const dataAssets = assets;

    if (users) {
      const newAssets = dataAssets.map((item) => {
        if (item == users) {
          item.messages = item.messages.concat(values.message);
          console.log(item);
        }
        return item;
      });
      setAssets(newAssets);
    }
  }

  function ChangeMessagesAssets(userId, title, content) {
    const newAssets = assets.map((user) => {
      if (user.name == registeredUser) {
        const newMessages = user.messages.map((message) => {
          if (registeredUserMessages.indexOf(message) == userId)
            return {
              user_id: userId,
              title: title,
              content: content,
            };
          return message;
        });
        setRegisteredUserMessages(newMessages);
        user.messages = newMessages;
        return user;
      }
      return user;
    });
    setAssets(newAssets);
  }
  function DeleteMessagesAssets(userId) {
    const newAssets = assets.map((user) => {
      if (user.name == registeredUser) {
        let newMessages = user.messages.map((message) => {
          if (registeredUserMessages.indexOf(message) == userId) return;
          return message;
        });

        newMessages = newMessages.filter((el) => {
          return el !== undefined;
        });
        setRegisteredUserMessages(newMessages);
        user.messages = newMessages;
        return user;
      }
      return user;
    });
    setAssets(newAssets);
  }

  function ChangePasswordAssets(newPassword) {
    const newAssets = assets.map((user) => {
      if (user.name == registeredUser) {
        return {
          name: user.name,
          password: newPassword,
          messages: user.messages,
        };
      }
      return user;
    });
    setAssets(newAssets);
  }

  function AddComment(comment) {
    setRegisteredUserMessages((prev) => prev.concat(comment));
  }

  function FindUser(username) {
    const newSortedUsers = [];
    users.forEach((user) => {
      if (user.toLowerCase().includes(username.target.value.toLowerCase())) {
        newSortedUsers.push(user);
      }
    });
    setSortedUsers(newSortedUsers);
  }

  function SignIn(username) {
    console.log(assets);
    const user = assets.find((u) => {
      return u.name == username;
    });
    setRegisteredUserMessages([]);
    setRegisteredUser(username);
    setRegisteredUserMessages((prev) => prev.concat(user.messages));
  }

  function SignUp(userData) {
    const newUser = [
      {
        name: userData.username,
        password: userData.password,
        messages: [],
      },
    ];
    const newAssets = assets.concat(newUser);
    setAssets(newAssets);
    setUsers((prev) => prev.concat(userData.username));
  }

  function LogOut() {
    setRegisteredUser("Пользователь не зарегестрирован");
  }

  return (
    <DataContext.Provider
      value={{
        assets,
        loading,
        users,
        sortedUsers,
        registeredUser,
        registeredUserMessages,
        SignIn,
        FindUser,
        AddAssets,
        AddComment,
        SignUp,
        LogOut,
        ChangeMessagesAssets,
        DeleteMessagesAssets,
        ChangePasswordAssets,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;

export function useData() {
  return useContext(DataContext);
}
