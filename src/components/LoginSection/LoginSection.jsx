import { useAPI } from "../../hooks/useAPI";
import { loginForm } from "../../utils/Login";
import { Form } from "../Form/Form";
import { useState } from "react";
import { signUpForm } from "../../utils/SignUp";
import { DonationSection } from "../DonationSection/DonationSection";

export const LoginSection = () => {
  //state der styrer om signup vises
  const [signUpOpen, setSignUpOpen] = useState(false);

  //Henter function fra useAPI
  const { apiRequest: loginRequest } = useAPI();
  const {apiRequest: signupRequest} = useAPI();

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
      "Du er nu logget ind",
      "Der skete en fejl, prøv igen senere",
      "Forkert email eller password"
    );
  }

  //Function til at signup
  function signUp(data){
    const body = new URLSearchParams();
    body.append('email', data.email);
    body.append('password', data.password);
    body.append('firstname', data.firstname);
    body.append('lastname', data.lastname);
    body.append('address', data.address);
    body.append('zipcode', data.zipcode);
    body.append('city', data.city)

    signupRequest('http://localhost:4242/users', {
      method: 'POST',
      body: body,
    }, 'Bruger er nu oprettet', 'Der skete en fejl, prøv igen senere')

    toggleView();
  }

  //Function til at vise signup
  function toggleView() {
    setSignUpOpen((prevState) => !prevState);
  }

  return (
    <>
      {signUpOpen ? (
        <section>
          <h2>Opret en konto</h2>
          <Form formArray={signUpForm} callback={signUp} buttonText="Opret" />
          <h5>
            Har du allerede en konto hos os? Klik{" "}
            <span onClick={toggleView} style={{ cursor: "pointer" }}>
              her
            </span>{" "}
            for at vende tilbage til login
          </h5>
        </section>
      ) : (
        <section>
          <h2>Velkommen tilbage</h2>
          <Form formArray={loginForm} callback={logIn} />
          <h5>
            Har du ikke allerede en konto? Klik{" "}
            <span onClick={toggleView} style={{ cursor: "pointer" }}>
              her
            </span>{" "}
            for at gå til sign up
          </h5>
        </section>
      )}
      <DonationSection/>
    </>
  );
};
