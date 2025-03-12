import { CreateListing } from "../components/CreateListing/CreateListing"
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper"
import { Splitter } from "../components/Splitter/Splitter"

export const CreatePost = () => {
  return (
    <SectionWrapper>
      <Splitter/>
      <CreateListing/>
    </SectionWrapper>
  )
}