import { useContext } from "react"
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper"
import { UserContext } from "../context/userContext"
import { LoginSection } from "../components/LoginSection/LoginSection";
import { Dashboard } from "../components/Dashboard/Dashboard";

export const Login = () => {
  const {userData} = useContext(UserContext);

  return (
    <SectionWrapper>
      {userData ? <Dashboard/> : <LoginSection/>}
    </SectionWrapper>
  )
}