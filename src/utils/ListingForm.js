export const listingForm = [
  {
    name: "title",
    label: "Titel",
    placeholder: "Title på dit produkt...",
    validation: {
      required: "Titel er påkrævet",
      minLength: { value: 3, message: "Titel skal være mindst 3 tegn" },
      maxLength: { value: 50, message: "Titel må ikke være mere end 50 tegn" },
    },
  },
  {
    name: "category",
    label: "Kategori",
    type: "select",
    options: [],
    validation: {
      required: "Kategori er påkrævet",
    },
  },
  {
    name: "description",
    label: "Annonce tekst",
    type: "textarea",
    placeholder: "Skriv en annonce tekst her der beskriver produktet...",
    validation: {
      required: "Beskrivelse er påkrævet",
      minLength: { value: 10, message: "Beskrivelse skal være mindst 10 tegn" },
      maxLength: { value: 250, message: "Beskrivelse må max være 250 tegn" }
    },
  },
  {
    name: "url",
    label: "URL til billede",
    type: "url",
    placeholder:
      "Har du et billede som ligger på nettet kan du indsætte en URL her...",
  },
  {
    name: "price",
    label: "Pris",
    type: "text",
    placeholder: "Pris",
    validation: {
      required: "Pris er påkrævet",
      min: { value: 0, message: "Prisen skal være et positivt tal" },
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message: "Pris skal være et gyldigt tal",
      },
    },
  },
];
