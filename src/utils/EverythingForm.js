export const everythingForm = [
  {
    name: "firstname",
    label: "Fornavn",
    validation: {
      required: "Fornavn er påkrævet",
      minLength: { value: 2, message: "Fornavn skal være mindst 2 bogstaver" },
      maxLength: {
        value: 15,
        message: "Fornavn må ikke være mere end 15 tegn",
      },
      pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/,
        message: "Fornavn må ikke indeholde bogstaver",
      },
    },
  },
  {
    name: "lastname",
    label: "Efternavn",
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
    name: "age",
    label: "Alder",
    validation: {
      required: "Alder er påkrævet",
      pattern: {
        value: /^(?:1[01][0-9]|[1-9][0-9]?)$/,
        message: "Alder skal være et tal",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: {
      required: "Password er påkrævet",
      minLength: { value: 8, message: "Password skal være minimum 8 tegn" },
    },
  },

  //Custom function der kommer fra React-Hook-form, som sammenligner value af feltet med value af et andet felt, i dette tilfælde password feltet. Context er her alle values for alle felter, og vi specificerer at det er password feltet vi vil sammenligne med
  {
    name: "repeatPassword",
    label: "Gentag Password",
    placeholder: "Gentag password",
    type: "password",
    validation: {
      required: "Gentag venligst password",
      validate: (value, context) => {
        if (value !== context.password) {
          return "Passwords skal være ens";
        }
        return true;
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: {
      required: "Email er påkrævet",
      pattern: {
        value: /^[a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email skal være en rigtig email",
      },
    },
  },
  {
    name: "city",
    label: "By",
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
    validation: {
      required: "Postnummer er påkrævet",
      pattern: {
        value: /^[0-9]{4,5}$/,
        message: "Postnummer skal være 4 eller 5 tegn",
      },
    },
  },
  {
    name: "address",
    label: "Adresse",
    validation: {
      required: "Adresse er påkrævet",
      minLength: {
        value: 5,
        message: "Adresse skal være minimum 5 tegn",
      },
    },
  },
  {
    name: "phone",
    label: "Telefonnummer",
    validation: {
      required: "Telefonnummer er påkrævet",
      pattern: {
        value: /^[0-9]{8}$/,
        message: "Telefonnummer skal være 8 tal",
      },
    },
  },
  {
    name: "pretty",
    label: "Køn",
    type: "radio",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nej", label: "Nej" },
      { value: "altid", label: "Altid" },
    ],
    validation: {
      required: "Svar er påkrævet",
    },
  },
  {
    name: "country",
    label: "Land",
    type: "select",
    options: [
      { value: "denmark", label: "Danmark" },
      { value: "sweden", label: "Sverige" },
      { value: "norway", label: "Norge" },
      { value: "germany", label: "Tyskland" },
    ],
    validation: {
      required: "Land er påkrævet",
    },
  },
];
