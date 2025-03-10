import { useContext } from "react";
import { useAPI } from "../../hooks/useAPI";
import { NewsletterForm } from "../../utils/Newsletter";
import { Form } from "../Form/Form";
import { GridContainer } from "../GridContainer/GridContainer";
import style from "./Footer.module.scss";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { UserContext } from "../../context/userContext";

export const Footer = () => {

  const { userData } = useContext(UserContext);

  const {apiRequest: patchRequest} = useAPI();

    //Function til at håndtere signup
    function newsletterSignUp() {
      const body = new URLSearchParams()
      body.append('hasNewsletter', true)
  
      patchRequest('http://localhost:4242/users', {
        method: 'PATCH',
        body: body,
        headers: { Authorization: `Bearer ${userData?.access_token}` },
      },
      'Du er nu tilmeldt nyhedsbrevet',
      'Noget gik galt, prøv igen senere',
    )
    }

  return (
    <footer className={style.footerStyling}>
      <GridContainer columns={userData ? 414 : 18} gap={2}>
        {userData && (
          <section>
            <h3>Nyhedsbrev</h3>
            <p>
              Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev
              og få de seneste klima opdateringer direkte i din indbakke
            </p>
            <Form
              callback={newsletterSignUp}
              buttonText="Tilmeld"
              formArray={NewsletterForm}
              custom='newsletter'
              customButton='newsletter'
              customForm='newsletterForm'
            />
          </section>
        )}
        <section>
          <h3>Kontakt</h3>
          <ul>
            <li>Redningen 32</li>
            <li>2210 Vinterby Øster</li>
            <li>+45 88229422</li>
            <li>dga@info.dk</li>
          </ul>
        </section>
        <section>
          <h3>FN´s Verdensmål</h3>
          <p>
            Vi støtter på organisatorisk plan op om FN´s verdensmål og har
            derfor besluttet at en del af overskuddet går direkte til verdensmål
            nr. 13; Klimahandling
          </p>
          <a
            href="https://www.verdensmaalene.dk/fakta/verdensmaalene"
            target="_blank"
          >
            Læs mere om verdensmålene her
          </a>
        </section>
      </GridContainer>

      {/* Container til toast notifikationer */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </footer>
  );
};
