import { useEffect } from "react";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { useAPI } from "../hooks/useAPI";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Card } from "../components/Card/Card";
import { MissionStatement } from "../components/MissionStatement/MissionStatement";
import { DonationSection } from "../components/DonationSection/DonationSection";
import { useNavigate } from "react-router-dom";

export const Frontpage = () => {
  //data og function fra useAPI
  const { apiRequest: getProducts, data: productData } = useAPI();
  const { apiRequest: getCategories, data: categoryData } = useAPI();

  const productURL = "http://localhost:4242/products";
  const categoryURL = "http://localhost:4242/categories";

  //Get products
  useEffect(() => {
    getProducts(productURL);
  }, [productURL]);

  //Get categories
  useEffect(() => {
    getCategories(categoryURL);
  }, [categoryURL]);

  //Get 6 random products
  const sixRandomProducts = productData?.data
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 6);

  //Get 6 random categories
  const sixRandomCategories = categoryData?.data
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 6);

  //Navigate fra useNavigate
  const navigate = useNavigate();

  return (
    <>
      <SectionWrapper>
        <section
          style={{
            borderTop: "4px solid green",
            borderBottom: "4px solid green",
            paddingBottom: "2vw",
          }}
        >
          <h3 style={{ margin: "2vw 0 1vw 0" }}>Udvalgte Produkter</h3>
          <GridContainer columns={6} gap={2}>
            {sixRandomProducts?.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.name}
                custom="randomProducts"
              ></Card>
            ))}
          </GridContainer>
        </section>

        <MissionStatement />

        <section
          style={{
            borderTop: "4px solid green",
            borderBottom: "4px solid green",
            paddingBottom: "2vw",
          }}
        >
          <h3 style={{ margin: "2vw 0 1vw 0" }}>Populære Kategorier</h3>
          <GridContainer columns={6} gap={2}>
            {sixRandomCategories?.map((item) => (
              <Card
                action={() => navigate(`/categories/${item.slug}`)}
                key={item.id}
                image={item.category_image}
                title={item.name}
                custom="randomCategories"
              ></Card>
            ))}
          </GridContainer>
        </section>

        <DonationSection />
      </SectionWrapper>
    </>
  );
};
