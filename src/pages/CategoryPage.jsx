import { useEffect } from "react";
import { useAPI } from "../hooks/useAPI";
import { useNavigate, useParams } from "react-router-dom";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Card } from "../components/Card/Card";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { CategoryMenu } from "../components/CategoryMenu/CategoryMenu";
import { Splitter } from "../components/Splitter/Splitter";

export const CategoryPage = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  //Functions og data fra useAPI
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
        <Splitter/>
        <GridContainer columns={13} gap={2}>
          <CategoryMenu slug={slug} />
          <section>
            <GridContainer columns={3} gap={2}>
              {productsFromCategoryData?.data?.map((item) => (
                <Card
                  action={() => navigate(`/product/${item.slug}`)}
                  key={item.id}
                  title={item.name}
                  image={item.image}
                  description={item.description}
                  custom='categoryPage'
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
