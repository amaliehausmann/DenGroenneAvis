export const signUpForm = [
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: 'Din email...',
        validation: {
          required: "Email er påkrævet",
          pattern: {
            value: /^[a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email skal være en rigtig email",
          },
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: 'Dit password...',
        validation: {
          required: "Password er påkrævet",
          minLength: { value: 8, message: "Password skal være minimum 8 tegn" },
        },
      },
      {
        name: "firstname",
        label: "Fornavn",
        placeholder: 'Dit fornavn...',
        validation: {
          required: "Fornavn er påkrævet",
          minLength: { value: 2, message: "Fornavn skal være mindst 2 bogstaver" },
          maxLength: {
            value: 15,
            message: "Fornavn må ikke være mere end 15 tegn",
          },
          pattern: {
            value: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/,
            message: "Fornavn må ikke indeholde tal",
          },
        },
      },
      {
        name: "lastname",
        label: "Efternavn",
        placeholder: 'Dit efternavn...',
        validation: {
          required: "Efternavn er påkrævet",
          minLength: {
            value: 2,
            message: "Efternavn skal være mindst 2 bogstaver",
          },
          maxLength: {
            value: 20,
            message: "Efternavn må ikke være mere end 20 tegn",
          },
          pattern: {
            value: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/,
            message: "Efternavn må ikke indeholde bogstaver",
          },
        },
      },
      {
        name: "address",
        label: "Adresse",
        placeholder: 'Din adresse...',
        validation: {
          required: "Adresse er påkrævet",
          minLength: {
            value: 5,
            message: "Adresse skal være minimum 5 tegn",
          },
        },
      },
      {
        name: "city",
        label: "By",
        placeholder: 'Din by...',
        validation: {
          required: "By er påkrævet",
          pattern: {
            value: /^[A-Za-zÀ-ÿ\s-]+$/,
            message: "By må kun indeholde bogstaver",
          },
        },
      },
      {
        name: "zipcode",
        label: "Postnummer",
        placeholder: 'Dit postnummer...',
        validation: {
          required: "Postnummer er påkrævet",
          pattern: {
            value: /^[0-9]{4,5}$/,
            message: "Postnummer skal være 4 eller 5 tegn",
          },
        },
      },

      {
        name: "acceptTerms",
        label: "Jeg har læst og forstået de gældende betingelser for oprettelse af kundekonto og brug af denne side",
        type: "checkbox",
        validation: {
          required: "Du skal acceptere betingelserne for at fortsætte",
        },
      },
]