import { useParams } from "react-router-dom";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { CategoryMenu } from "../components/CategoryMenu/CategoryMenu";
import { useAPI } from "../hooks/useAPI";
import { useEffect } from "react";
import { Card } from "../components/Card/Card";
import { CommentSection } from "../components/CommentSection/CommentSection";
import { Splitter } from "../components/Splitter/Splitter";
import { usePageTitle } from "../hooks/usePageTitle";

export const ProductPage = () => {
  const { slug } = useParams();

  //PageTitle
  usePageTitle({ pageTitle: `Produkt: ${slug}` });

  //Henter function fra useAPI
  const { apiRequest: getProduct, data: productData } = useAPI();

  //URL
  const productURL = `http://localhost:4242/products/${slug}`;

  //fetcher produkter
  useEffect(() => {
    getProduct(productURL);
  }, [productURL]);

  //Destructure productData
  const item = productData?.data;

  // Function som refetcher productData
  const refetchData = () => {
    getProduct(productURL);
  };

  return (
    <SectionWrapper>
      <Splitter />
      <GridContainer columns={13} gap={2}>
        <CategoryMenu categoryId={item?.category_id} />
        {item && (
          <Card
            alttext={item.name}
            image={item.image}
            title={item.name}
            description={item.description}
            custom="singleProduct"
          >
            <h3>Pris: {item.price} kr</h3>
          </Card>
        )}
      </GridContainer>
      <Splitter />
      <CommentSection
        user="Sælger"
        commentData={item?.comments}
        productId={item?.id}
        productUserId={item?.user_id}
        refetchData={refetchData}
      />
    </SectionWrapper>
  );
};
