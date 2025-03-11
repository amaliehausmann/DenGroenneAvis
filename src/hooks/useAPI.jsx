import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

export const useAPI = () => {
  const [data, setData] = useState(null);

  //Henter setUserData fra userContext
  const { setUserData } = useContext(UserContext);

  const apiRequest = async (
    url,
    options,
    successMessage,
    errorMessage,
    unauthorizedMessage
  ) => {
    try {
      const response = await fetch(url, { ...options });

      //Hvis response er unauthorized vises en unauthorizedMessage
      if (response.status === 401) {
        toast.warn(unauthorizedMessage);
        throw new Error(`Status: ${response.status}`);
      }

      //Hvis status er en fejl men andet end 401 vises en almindelig errorMessage
      if (!response.ok) {
        toast.error(errorMessage);
        throw new Error(`Status: ${response.status}`);
      }

      const result = await response.json();

      //Hvis det er en succesfuld sletning så opdateres viewet med det samme
      if (result.message === "Record deleted") {
        //Sletter det valgte item fra viewet ved at kopiere (spread-operator) det gamle array og filtrere
        setData((prevData) => ({
          ...prevData,
          items: prevData.items.filter((item) => item.id !== result.id),
        }));
      }
      

      //Hvis result indeholder en accesstoken settes userData til dette
      if (result.data.access_token) {
        setUserData(result.data);
      }

      //Hvis det lykkes vises en successMessage
      setData(result);
      if (successMessage !== "") {
        toast.success(successMessage);
      }
    } catch (err) {
      console.error("API Request Error:", err);
    }
  };

  return {
    data,
    setData,
    apiRequest,
  };
};
