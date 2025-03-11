import { useNavigate } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import { useEffect } from "react";

export const CategoryMenu = ({ slug }) => {
  const navigate = useNavigate();

  const { apiRequest: getCategories, data: categoryData } = useAPI();

  const categoryURL = "http://localhost:4242/categories";

  //Henter kategorier
  useEffect(() => {
    getCategories(categoryURL);
  }, [categoryURL]);

  return (
    <aside>
      <h3>Alle kategorier</h3>
      <ul>
        {categoryData?.data?.map((item) => (
          <li
          key={item.id}
            style={{
              cursor: "pointer",
              fontWeight: slug === item.slug ? "900" : "400",
            }}
            onClick={() => navigate(`/categories/${item.slug}`)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
