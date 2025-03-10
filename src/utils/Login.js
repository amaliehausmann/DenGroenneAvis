export const loginForm = [
  {
    name: "email",
    label: "Email",
    type: "email",
    icon: 'email.svg',
    placeholder: 'Din email...',
    validation: {
      required: "Email er påkrævet",
      pattern: {
        value: /^[a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email skal være en gyldig email",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    icon: 'password.svg',
    placeholder: 'Dit password...',
    validation: {
      required: "Password er påkrævet",
      minLength: { value: 8, message: "Password skal være mindst 8 tegn" },
    },
  },
];
