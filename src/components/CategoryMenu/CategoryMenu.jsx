import { useNavigate } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import { useEffect } from "react";
import style from "./CategoryMenu.module.scss";

export const CategoryMenu = ({ slug, categoryId }) => {
  //Til at navigere brugeren
  const navigate = useNavigate();

  //Henter function fra useAPI
  const { apiRequest: getCategories, data: categoryData } = useAPI();

  //URL
  const categoryURL = "http://localhost:4242/categories";

  // Henter kategorier
  useEffect(() => {
    getCategories(categoryURL);
  }, [categoryURL]);

  return (
    <aside className={style.categoryMenu}>
      <h3>Alle kategorier</h3>
      <ul>
        {categoryData?.data?.map((item) => {
          const isActive = slug === item.slug || categoryId === item.id;
          return (
            <li
              key={item.id}
              style={{
                cursor: "pointer",
                fontWeight: isActive ? "900" : "400",
              }}
              onClick={() => navigate(`/categories/${item.slug}`)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
