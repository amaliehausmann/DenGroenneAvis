export const NewsletterForm = [
  {
    name: "newsletteremail",
    type: "email",
    placeholder: " ",
    validation: {
      required: "Email er påkrævet",
      pattern: {
        value: /^[a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email skal være en rigtig email",
      },
    },
  },
];
