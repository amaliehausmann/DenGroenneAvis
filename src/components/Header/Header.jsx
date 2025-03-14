import { useContext, useEffect, useState } from "react";
import style from "./Header.module.scss";
import { useAPI } from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

export const Header = () => {
  //Trækker data og function ud af hook
  const { apiRequest, data } = useAPI();

  //Kategori URL
  const categoryURL = "http://localhost:4242/categories";

  //Fetch af kategorier
  useEffect(() => {
    apiRequest(categoryURL);
  }, [categoryURL]);

  //function fra useNavigate
  const navigate = useNavigate();

  //Trækker userData ud fra userContext
  const { userData } = useContext(UserContext);

  //Navigering til createPost
  function navigateToCreate() {
    if (userData) {
      navigate("/createPost");
    } else {
      //Toast besked hvis man ikke er logget ind
      toast.error("Du skal være logget ind for at oprette en annonce");
    }
  }

  return (
    <header className={style.headerStyling}>
      <>
        <span onClick={() => navigate("/")} className={style.heading}>
          <h1>Den Grønne</h1>
          <h1>Avis</h1>
        </span>

        <section>
          <select
            aria-label="Vælg kategori"
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

          <button onClick={navigateToCreate}>Opret annonce</button>

          <span>
            <img src="/importantMail.svg" alt="mail icon" />
            <img src="/infosquare.svg" alt="info icon" />
            <img
              aria-label="Linker til login/min profil side"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
              src="/user.svg"
              alt="user icon"
            />
          </span>
        </section>
      </>
    </header>
  );
};
