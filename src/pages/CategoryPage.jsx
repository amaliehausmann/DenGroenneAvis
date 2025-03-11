import { useEffect } from "react";
import { useAPI } from "../hooks/useAPI";
import { useNavigate, useParams } from "react-router-dom";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Card } from "../components/Card/Card";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { CategoryMenu } from "../components/CategoryMenu/CategoryMenu";

export const CategoryPage = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  //Functions og data fra useAPI
  const { apiRequest: getCategories, data: categoryData } = useAPI();
  const {
    apiRequest: getProductsFromCategory,
    data: productsFromCategoryData,
  } = useAPI();

  //URLs
  const categoryURL = "http://localhost:4242/categories";
  const productsFromCategoryURL = `http://localhost:4242/products/category/${slug}`;

  //Henter produkter ud fra kategorien
  useEffect(() => {
    getProductsFromCategory(
      productsFromCategoryURL,
      {},
      "",
      "Ingen produkter i denne kategori, vælg en anden"
    );
  }, [productsFromCategoryURL]);

  return (
    <>
      <SectionWrapper>
        <GridContainer columns={2}>
          <CategoryMenu slug={slug} />
          <section>
            <GridContainer columns={3}>
              {productsFromCategoryData?.data.map((item) => (
                <Card
                  action={() => navigate(`/product/${item.slug}`)}
                  key={item.id}
                  title={item.name}
                  image={item.image}
                  description={item.description}
                >
                  <h5>Pris: {item.price} kr</h5>
                </Card>
              ))}
            </GridContainer>
          </section>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
