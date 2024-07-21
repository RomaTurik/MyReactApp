import { createContext, useContext, useEffect, useState } from "react";
import { data } from "../data";

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

  const userInput = document.querySelector("#find-user-input");

  useEffect(() => {
    setTimeout(() => {
      const users = new Set(
        data.reduce((acc, val) => {
          acc.push(val.name);
          return acc;
        }, [])
      );

      setUsers(users);
      setSortedUsers(users);
      setAssets(data);
      setLoading(false);
    }, 1);
  }, []);

  function AddAssets(values) {
    const usersData = users.add(values.name);
    setAssets((prev) => prev.concat(values));
    setUsers(usersData);
    if (userInput.value == "") {
      setSortedUsers(usersData);
    }
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
    setRegisteredUser(username);
  }

  return (
    <DataContext.Provider
      value={{
        assets,
        loading,
        users,
        sortedUsers,
        registeredUser,
        SignIn,
        FindUser,
        AddAssets,
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
