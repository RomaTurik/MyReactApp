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
  const [registeredUserMessages, setRegisteredUserMessages] = useState([])


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
    // const usersData = users.add(values.name);
    const users =  assets.find((user)=>{
      return user.name == values.name
    })
    const dataAssets = assets

    if(users){
      const newAssets = dataAssets.map((item)=>{
        if (item == users){
          item.message = item.message.concat(values.message)
          console.log(item);
        }
        return item
      })
      setAssets(newAssets)
    }
    // setAssets((prev) => prev.concat(values));
    // setUsers(usersData);
    // if (userInput.value == "") {
    //   setSortedUsers(usersData);
    // }
  }

  function AddComment(comment){
    setRegisteredUserMessages((prev)=> prev.concat(comment))
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
    const user = assets.find((u)=>{
      return u.name == username
    })
    setRegisteredUser(username);
    setRegisteredUserMessages((prev) => prev.concat(user.message))

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
        AddComment
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
