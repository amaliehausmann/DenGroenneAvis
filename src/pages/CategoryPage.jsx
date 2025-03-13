import { useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { useNavigate, useParams } from "react-router-dom";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Card } from "../components/Card/Card";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { CategoryMenu } from "../components/CategoryMenu/CategoryMenu";
import { Splitter } from "../components/Splitter/Splitter";
import { ItemPagination } from "../components/ItemPagination/ItemPagination";
import { usePageTitle } from "../hooks/usePageTitle";

export const CategoryPage = () => {
  const { slug } = useParams();

  //PageTitle
  usePageTitle({ pageTitle: `Kategori: ${slug} ` });

  const navigate = useNavigate();

  //State til at holde styr på pagination
  const [currentPage, setCurrentPage] = useState(1);

  //Definerer max produkter per side
  const maxItemsPerPage = 9;

  //Functions og data fra useAPI
  const {
    apiRequest: getProductsFromCategory,
    data: productsFromCategoryData,
  } = useAPI();

  //URLs
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

  //Beregner det totale antal sider
  const totalPages = Math.ceil(
    (productsFromCategoryData?.data?.length || 0) / maxItemsPerPage
  );

  //Slice produkter baseret på den nuværende side
  const paginatedProducts = productsFromCategoryData?.data?.slice(
    (currentPage - 1) * maxItemsPerPage,
    currentPage * maxItemsPerPage
  );

  return (
    <>
      <SectionWrapper>
        <Splitter />
        <GridContainer columns={13} gap={2}>
          <CategoryMenu slug={slug} />
          <section>
            <GridContainer columns={3} gap={2}>
              {paginatedProducts?.map((item) => (
                <Card
                  ariaLabel="Navigerer til siden for produktet"
                  action={() => navigate(`/product/${item.slug}`)}
                  key={item.id}
                  title={item.name}
                  image={item.image}
                  alttext={item.name}
                  description={item.description.substring(0, 50) + "..."}
                  custom="categoryPage"
                >
                  <h5>Pris: {item.price} kr</h5>
                </Card>
              ))}
            </GridContainer>
            <ItemPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </section>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
