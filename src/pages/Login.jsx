import { useContext } from "react";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { UserContext } from "../context/userContext";
import { LoginSection } from "../components/LoginSection/LoginSection";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { usePageTitle } from "../hooks/usePageTitle";

export const Login = () => {
  const { userData } = useContext(UserContext);

  //PageTitle
  usePageTitle({ pageTitle: userData ? `Min profil ` : "Login" });
  return (
    <SectionWrapper>
      {userData ? <Dashboard /> : <LoginSection />}
    </SectionWrapper>
  );
};
