import { GridContainer } from "../GridContainer/GridContainer";
import style from "./DonationSection.module.scss";

export const DonationSection = () => {
  return (
    <section className={style.donationSection}>
      <GridContainer columns={2} gap={4}>
        <div className={style.donationOne}>
          <h3>Donationer til Dato</h3>
          <h4>Sammen med dig har vi siden starten indsamlet:</h4>
          <h1>452.231,50 kr</h1>
          <h6>Tak fordi du handler brugt, med omtanke for klimaet</h6>
        </div>
        <div className={style.donationTwo}>
          <h3>Donationer i år</h3>
          <h4>Sammen med dig har vi i år indsamlet:</h4>
          <h1>112.452,75 kr</h1>
          <h6>Tak fordi du handler brugt, med omtanke for jorden</h6>
        </div>
      </GridContainer>
    </section>
  );
};
