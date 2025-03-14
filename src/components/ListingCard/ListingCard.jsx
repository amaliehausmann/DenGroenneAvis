import { Link } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import style from "./ListingCard.module.scss";

export const ListingCard = ({
  title,
  price,
  description,
  imgSRC,
  slug,
  refetchData,
  productId,
}) => {
  //Henter function til at slette annonce
  const { apiRequest: deleteListing } = useAPI();

  //Henter userData fra userContext
  const { userData } = useContext(UserContext);

  //Funtion til at slette en annonce
  async function deleteAListing(id) {
    try {
      await deleteListing(
        `http://localhost:4242/products/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userData?.access_token}` }, //Token
        },
        "Annonce slettet", //Success message
        "Der skete en fejl, prøv igen senere" //Error message
      );

      //Trigger refetch af data
      refetchData();
    } catch (error) {
      console.error("Fejl under sletning", error);
    }
  }
  return (
    <div className={style.listingCard}>
      <div>
        <div>
          <span>
            <h3>{title}</h3> <h3>Pris: {price} kr</h3>
          </span>
          <p>{description}</p>
        </div>
        <img style={{ width: "100%" }} src={imgSRC} alt="" />
      </div>
      <span>
        <Link to={`/product/${slug}`}>Gå til annonce</Link>{" "}
        <p
          style={{
            cursor: "pointer",
          }}
          onClick={() => deleteAListing(productId)}
        >
          Fjern annonce{" "}
        </p>
      </span>
    </div>
  );
};
