import { useEffect, useState } from "react";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { IoMenu } from "react-icons/io5";
import style from "./Header.module.scss";
import { useAPI } from "../../hooks/useAPI";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  //State til at holde styr på om children skal vises
  const [showChildren, setShowChildren] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState();

  //Henter skærmbredden fra useScreenWidth
  const screenWidth = useScreenWidth();

  function toggleChildren() {
    setShowChildren((prevState) => !prevState);
  }

  //Trækker data og function ud af hook
  const { apiRequest, data } = useAPI();

  //Kategori URL
  const categoryURL = "http://localhost:4242/categories";

  //Fetch af kategorier
  useEffect(() => {
    apiRequest(categoryURL);
  }, [categoryURL]);

  const navigate = useNavigate();

  return (
    <header className={style.headerStyling}>
      {/* Hvis skærmstørrelsen er under 768px vil menu ikonet vises og children skjules  */}
      {screenWidth < 768 ? (
        <>
          <span onClick={toggleChildren}>
            <IoMenu />
          </span>
          <span className={style.heading}>
            <h1>Den Grønne</h1>
            <h1>Avis</h1>
          </span>
        </>
      ) : (
        <>
          <span onClick={() => navigate("/")} className={style.heading}>
            <h1>Den Grønne</h1>
            <h1>Avis</h1>
          </span>

          <section>
          <select
            style={{ cursor: "pointer" }}
            onChange={(e) => navigate(`/categories/${e.target.value}`)}
            value={""}
          >
            <option value="" disabled>
              Vælg en kategori
            </option>
            {data?.data?.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>

          <Button
            action={() => navigate("/createPost")}
            title="Opret annonce"
            color="bluegreen"
          ></Button>

          <span>
            <img src="/importantMail.svg" alt="mail icon" />
            <img src="/infosquare.svg" alt="info icon" />
            <img
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
              src="/user.svg"
              alt="user icon"
            />
          </span>
          </section>
        </>
      )}
    </header>
  );
};
