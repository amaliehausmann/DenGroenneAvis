import { createContext, useEffect, useState } from "react";
//Opretter en ny context
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  //State til at gemme bruger data
  const [userData, setUserData] = useState();

  //useEffect som kører hver gang userData ændres
  useEffect(() => {
    //Hvis userData ikke allerede er sat
    if (!userData) {
      //Tjekker om der findes userData i sessionStorage
      if (sessionStorage.getItem("userData")) {
        //Henter og parser brugerdata fra sessionStorage og sætter den i en state
        setUserData(JSON.parse(sessionStorage.getItem("userData")));
      }
    }

    //Hvis userData har en access_token gemmes dataene i sessionstorage
    if (userData?.access_token) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    //Gør userData og setUserData tilgængelige for komponenter som bruger denne context
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
