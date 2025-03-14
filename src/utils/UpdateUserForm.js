export const updateUserForm = [
  {
    name: "firstname",
    label: "Fornavn",
    placeholder: "Dit fornavn...",
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
    placeholder: "Dit efternavn...",
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
    placeholder: "Din adresse...",
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
    placeholder: "Din by...",
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
    placeholder: "Dit postnummer...",
    validation: {
      required: "Postnummer er påkrævet",
      pattern: {
        value: /^[0-9]{4,5}$/,
        message: "Postnummer skal være 4 eller 5 tegn",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Din email...",
    validation: {
      required: "Email er påkrævet",
      pattern: {
        value: /^[a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email skal være en rigtig email",
      },
    },
  },
];

export const updateUserForm2 = [
  {
    name: "hasNewsletter",
    label:
      "Jeg ønsker at modtage nyheder om klima-indsatsen, gode tilbud, ekslusive deals og lignende promoverings-mails fra den grønne avis og samarbejds-parnere?",
    type: "checkbox",
  },
  {
    name: "hasNotification",
    label:
      "Jeg ønsker at modtage notifikationer i form af emails når der sker en opdatering på en af mine annoncer eller jeg modtager en ny henvendelse?",
    type: "checkbox",
  },
];
