import { useContext } from "react"
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper"
import { UserContext } from "../context/userContext"
import { LoginSection } from "../components/LoginSection/LoginSection";

export const Login = () => {
  const {userData} = useContext(UserContext);

  return (
    <SectionWrapper>
      {userData ? '' : <LoginSection/>}
    </SectionWrapper>
  )
}