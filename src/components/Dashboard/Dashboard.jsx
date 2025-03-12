import { useContext, useEffect, useState } from "react";
import { ListingCard } from "../ListingCard/ListingCard";
import { UserContext } from "../../context/userContext";
import { useAPI } from "../../hooks/useAPI";
import { UpdateUser } from "../UpdateUser/UpdateUser";
import style from './Dashboard.module.scss'
import { Splitter } from "../Splitter/Splitter";

export const Dashboard = () => {
  //State til at holde styr på hvad der bliver vist
  const [showListing, setShowListings] = useState(false);

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

  //Function til at toggle hvad der bliver vist
  function toggleView() {
    setShowListings((prevState) => !prevState);
  }

  return (
    <section className={style.dashBoard}>
      <Splitter/>
      <span className={style.buttons}>
        <button style={{backgroundColor: showListing ? 'white' : '#1D8439', color: showListing ? '#1D8439' : 'white' }} onClick={toggleView}>Min Profil</button>
        <button style={{backgroundColor: showListing ? '#1D8439' : 'white', color: showListing ? 'white' : '#1D8439' }}  onClick={toggleView}>Mine annoncer</button>
      </span>

      {showListing ? (
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
      ) : (
        <UpdateUser listingData={listingData?.data} />
      )}
    </section>
  );
};
