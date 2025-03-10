import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  //Hvis user datas access token findes, så sæt userData i vores sessionstorage
  useEffect(() => {
    if (!userData) {
      //Hvis userData kan findes i sessionstorage så set den i en local state
      if (sessionStorage.getItem("userData")) {
        setUserData(JSON.parse(sessionStorage.getItem("userData")));
      }
    }

    if (userData?.access_token) {
      //Hvis userData findes i local state, så sæt den i sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
