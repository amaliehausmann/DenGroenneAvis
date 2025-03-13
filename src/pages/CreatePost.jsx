import { CreateListing } from "../components/CreateListing/CreateListing";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Splitter } from "../components/Splitter/Splitter";
import { usePageTitle } from "../hooks/usePageTitle";

export const CreatePost = () => {
  //PageTitle
  usePageTitle({ pageTitle: "Den Grønne Avis - Opret Annonce" });
  
  return (
    <SectionWrapper>
      <Splitter />
      <CreateListing />
    </SectionWrapper>
  );
};
