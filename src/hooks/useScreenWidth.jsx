import { useEffect, useState } from "react";

export const useScreenWidth = () => {
    //State til at holde styr på den nuværende skærmbredde
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {

    //Function der opdaterer skærmbredden
    function handleWindowResize() {
      setWidth(window.innerWidth);
    }

    //Tilføjer en eventListener som kalder handleWindowResize, når vinduet ændrer størrelse
    window.addEventListener("resize", handleWindowResize);

    //En function der fjerner eventListeneren når komponentet unmountes
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  //Returnerer skærmbredden
  return width;
};
