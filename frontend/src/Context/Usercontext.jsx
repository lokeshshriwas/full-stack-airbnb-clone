import { createContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then((userData) => {
        setUser(userData.data);
        setReady(true);
      });
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, ready }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
