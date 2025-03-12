import { useContext, useEffect } from "react";
import { Button } from "../Button/Button";
import { GridContainer } from "../GridContainer/GridContainer";
import { ListingCard } from "../ListingCard/ListingCard";
import { UserContext } from "../../context/userContext";
import { useAPI } from "../../hooks/useAPI";
import { UpdateUser } from "../UpdateUser/UpdateUser";

export const Dashboard = () => {
  const { userData } = useContext(UserContext);

  const { apiRequest: getListings, data: listingData } = useAPI();

  const listingURL = "http://localhost:4242/users";

  useEffect(() => {
    getListings(listingURL, {
      headers: { Authorization: `Bearer ${userData?.access_token}` },
    });
  }, [listingURL]);

  function refetchData() {
    getListings(listingURL, {
      headers: { Authorization: `Bearer ${userData?.access_token}` },
    });
  }

  console.log(listingData);

  return (
    <section>
      <span>
        <button>Min Profil</button>
        <button>Mine annoncer</button>
      </span>
      <GridContainer columns={2}>
        <section>
          {listingData?.data?.products.map((item) => (
            <ListingCard
              key={item.id}
              title={item.name}
              price={item.price}
              description={item.description}
              imgSRC={item.image}
              slug={item.slug}
              refetchData={refetchData}
              productId={item.id}
            />
          ))}
        </section>
        <UpdateUser listingData={listingData?.data} />
      </GridContainer>
    </section>
  );
};
