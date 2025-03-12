import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import style from "./Form.module.scss";

export const Form = ({
  formArray,
  callback,
  buttonText,
  children,
  custom,
  customForm,
  customButton,
  selectPlaceholder,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function submit(data) {
    callback(data);
    reset();
  }

  return (
    <form
      className={`${style.formStyling} ${style[customForm]}`}
      onSubmit={handleSubmit(submit)}
    >
      {formArray.map((item) => (
        <InputField
          key={item.name}
          name={item.name}
          label={item.label}
          type={item.type}
          placeholder={item.placeholder}
          register={register}
          validation={item.validation}
          error={errors[item.name]}
          options={item.options}
          imgSRC={item.icon}
          custom={custom}
          selectPlaceholder={selectPlaceholder}
        />
      ))}
      {children}
      <input
        type="submit"
        value={buttonText}
        className={`${style[customButton]}`}
      />
    </form>
  );
};
