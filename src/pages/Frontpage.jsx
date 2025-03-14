import { useEffect } from "react";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { useAPI } from "../hooks/useAPI";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Card } from "../components/Card/Card";
import { MissionStatement } from "../components/MissionStatement/MissionStatement";
import { DonationSection } from "../components/DonationSection/DonationSection";
import { useNavigate } from "react-router-dom";
import { Splitter } from "../components/Splitter/Splitter";
import { usePageTitle } from "../hooks/usePageTitle";

export const Frontpage = () => {
  //PageTitle
  usePageTitle({ pageTitle: "Den Grønne Avis - Forside" });

  //data og function fra useAPI
  const { apiRequest: getProducts, data: productData } = useAPI();
  const { apiRequest: getCategories, data: categoryData } = useAPI();

  const productURL = "http://localhost:4242/products";
  const categoryURL = "http://localhost:4242/categories";

  //Ftecher produkter
  useEffect(() => {
    getProducts(productURL);
  }, [productURL]);

  //fetcher kategorier
  useEffect(() => {
    getCategories(categoryURL);
  }, [categoryURL]);

  //få 6 tilfældige produkter
  const sixRandomProducts = productData?.data
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 6);

  //få 6 tilfældige kategorier
  const sixRandomCategories = categoryData?.data
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 6);

  //Navigate fra useNavigate
  const navigate = useNavigate();

  return (
    <>
      <SectionWrapper>
        <Splitter />
        <section>
          <h3 style={{ marginBottom: "1vw" }}>Udvalgte Produkter</h3>
          <GridContainer columns={6} gap={2}>
            {sixRandomProducts?.map((item) => (
              <Card
                ariaLabel="Navigerer til siden for produktet"
                key={item.id}
                image={item.image}
                title={item.name}
                alttext={item.name}
                custom="randomProducts"
                action={() => navigate(`/product/${item.slug}`)}
              ></Card>
            ))}
          </GridContainer>
        </section>
        <Splitter />

        <MissionStatement />
        <Splitter />
        <section>
          <h3 style={{ marginBottom: "1vw" }}>Populære Kategorier</h3>
          <GridContainer columns={6} gap={2}>
            {sixRandomCategories?.map((item) => (
              <Card
                ariaLabel="Navigerer til kategori siden"
                action={() => navigate(`/categories/${item.slug}`)}
                key={item.id}
                alttext={item.name}
                image={item.category_image}
                title={item.name}
                custom="randomCategories"
              ></Card>
            ))}
          </GridContainer>
        </section>
        <Splitter />
        <DonationSection />
      </SectionWrapper>
    </>
  );
};
