import { useAPI } from "../../hooks/useAPI";
import { loginForm } from "../../utils/Login";
import { Form } from "../Form/Form";
import { useState } from "react";
import { signUpForm } from "../../utils/SignUp";
import { DonationSection } from "../DonationSection/DonationSection";
import { Splitter } from "../Splitter/Splitter";
import style from "./LoginSection.module.scss";

export const LoginSection = () => {
  //state der styrer om signup vises
  const [signUpOpen, setSignUpOpen] = useState(false);

  //Henter functions fra useAPI
  const { apiRequest: loginRequest } = useAPI();
  const { apiRequest: signupRequest } = useAPI();

  //Function til at logge ind
  function logIn(data) {
    const body = new URLSearchParams();
    body.append("username", data.email);
    body.append("password", data.password);

    loginRequest(
      "http://localhost:4242/login",
      {
        method: "POST",
        body: body,
      },
      "Du er nu logget ind", //Success message
      "Der skete en fejl, prøv igen senere", //Error message
      "Forkert email eller password" //Unauthorized message
    );
  }

  //Function til at signup
  function signUp(data) {
    const body = new URLSearchParams();
    body.append("email", data.email);
    body.append("password", data.password);
    body.append("firstname", data.firstname);
    body.append("lastname", data.lastname);
    body.append("address", data.address);
    body.append("zipcode", data.zipcode);
    body.append("city", data.city);

    signupRequest(
      "http://localhost:4242/users",
      {
        method: "POST",
        body: body,
      },
      "Bruger er nu oprettet", //Success message
      "Der skete en fejl, prøv igen senere" //Error message
    );

    //Funktion til at toggle View
    toggleView();
  }

  //Function til at vise signup/login
  function toggleView() {
    setSignUpOpen((prevState) => !prevState);
  }

  return (
    <>
      <Splitter />
      {signUpOpen ? (
        <section className={style.signUp}>
          <h2>Opret en konto</h2>
          <Form
            formArray={signUpForm}
            callback={signUp}
            buttonText="Opret"
            custom="signupInput"
            customForm="signup"
            customButton="signupButton"
          >
            <h5>
              Har du allerede en konto hos os? Klik{" "}
              <span onClick={toggleView} style={{ cursor: "pointer" }}>
                her
              </span>{" "}
              for at vende tilbage til login
            </h5>
          </Form>
        </section>
      ) : (
        <section className={style.loginSection}>
          <h2>Velkommen tilbage</h2>
          <Form
            formArray={loginForm}
            callback={logIn}
            custom="loginInput"
            customForm="login"
            customButton="loginButton"
            buttonText="Login"
          >
            <h5>
              Har du ikke allerede en konto? Klik{" "}
              <span onClick={toggleView} style={{ cursor: "pointer" }}>
                her
              </span>{" "}
              for at gå til sign up
            </h5>
          </Form>
        </section>
      )}
      <Splitter />
      <DonationSection />
    </>
  );
};
