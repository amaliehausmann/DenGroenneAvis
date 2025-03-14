import { useContext, useEffect, useState } from "react";
import { Form } from "../Form/Form";
import { useAPI } from "../../hooks/useAPI";
import { listingForm } from "../../utils/ListingForm";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import style from "./CreateListing.module.scss";

export const CreateListing = () => {
  //Henter function og data fra useAPI()
  const { apiRequest: getCategories, data: categoryData } = useAPI();

  //URL til at hente kategorier
  const categoryURL = "http://localhost:4242/categories";

  //State til at holde styr på kategori Options
  const [categoryOptions, setCategoryOptions] = useState([]);

  //Fetcher kategorier
  useEffect(() => {
    getCategories(categoryURL);
  }, [categoryURL]);

  //useEffect der sætter categoryOptions til options, opdaterer når categoryData opdateres
  useEffect(() => {
    // Mapper categoryData ud og definerer value og label
    if (categoryData?.data) {
      const options = categoryData.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setCategoryOptions(options);
    }
  }, [categoryData]);

  //Opretter et opdateret form array ved at mappe den gamle form ud
  const updatedForm = listingForm.map((item) => {
    //Hvis item.name i listingForm er category, tilføjes categoryOptions på dette item i options arrayet
    if (item.name === "category") {
      return {
        ...item, //Anvender spread-operator til at beholde alt i itemet og udelukkende ændre/tilføje til options
        options: categoryOptions,
      };
    }
    //Hvis item.name ikke er category returneres item'et uændret
    return item;
  });

  //Henter userData fra UserContext
  const { userData } = useContext(UserContext);

  //Henter navigate fra useNavigate
  const navigate = useNavigate();

  //Henter function fra useAPI() til at poste data
  const { apiRequest: postRequest } = useAPI();

  // Funktion til at oprette en ny annonce
  async function postListing(data) {
    const body = new URLSearchParams();
    body.append("name", data.title);
    body.append(
      "image",
      data.url ||
        "https://hjerm-byg.dk/wp-content/uploads/2021/03/intet-billede.jpg" //Hvis brugeren ikke sender en url med
    );
    body.append("description", data.description);
    body.append("price", data.price);
    body.append("category_id", data.category);

    try {
      //Sender POST request til serveren
      await postRequest(
        "http://localhost:4242/products",
        {
          method: "POST",
          body: body,
          headers: { Authorization: `Bearer ${userData?.access_token}` }, //Token
        },
        "Annonce oprettet", //Success message
        "Der skete en fejl, prøv igen senere" //error message
      );

      //Navigerer brugeren til login-siden efter oprettelse
      navigate(`/login`);
    } catch (error) {
      console.error("Error during listing creation:", error);
    }
  }

  return (
    <div className={style.createListing}>
      <h1>Opret ny annonce</h1>
      <h5>Her kan du oprette en ny annonce.</h5>
      <h5>
        Du har mulighed for at slette dine annoncer igen under “min konto” siden
      </h5>

      <Form
        formArray={updatedForm}
        selectPlaceholder="Hvilken kategori tilhører dit produkt..."
        buttonText="Opret"
        callback={postListing}
        customForm="listingForm"
        custom="listingInput"
        customButton="listingButton"
      />
    </div>
  );
};
