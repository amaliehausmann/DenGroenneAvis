import { Link } from "react-router-dom";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";

//Page til at håndtere hvis du navigerer til en side som ikke findes
export const PageNotFound = () => {
  return (
    <SectionWrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "5vw",
        }}
      >
        <h1>404 - Denne side findes ikke</h1>
        <p>
          Gå tilbage til{" "}
          <Link style={{ color: "black" }} to={"/"}>
            forsiden
          </Link>
        </p>
      </div>
    </SectionWrapper>
  );
};
