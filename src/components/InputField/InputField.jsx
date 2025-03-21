import style from "./InputField.module.scss";

export const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  register, //Funktion fra React Hook Form til at registrere input
  validation, //Valideringsfejl
  error,
  options = [],
  imgSRC,
  custom,
  selectPlaceholder,
  defaultValue,
  ariaLabel, //Accesibility
}) => {
  //Standard placeholder
  const defaultPlaceholder = placeholder || `Indtast ${label}`;

  // Hvis typen er checkbox
  if (type === "checkbox") {
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className={style.InputStyling}
      >
        <div style={{ display: "flex" }}>
          <input
            id={name}
            type="checkbox"
            {...register(name, validation)}
            style={{ marginRight: "0.5vw" }}
          />
          <label htmlFor={name}>{label}</label>
        </div>
        {error && (
          <p style={{ color: "orange", marginTop: "0.5vw" }}>{error.message}</p>
        )}
      </div>
    );
  }

  // Hvis typen er hverken radio, select eller checkbox
  if (type !== "radio" && type !== "select" && type !== "checkbox") {
    return (
      <div className={`${style.InputStyling} ${style[custom]}`}>
        <label htmlFor={name}>{label}</label>
        <span>
          <input
            aria-label={ariaLabel}
            defaultValue={defaultValue}
            id={name}
            placeholder={defaultPlaceholder}
            type={type}
            autoComplete="on"
            {...register(name, validation)}
            style={{
              border: error ? "2px solid orange" : "",
            }}
          />
          <img src={imgSRC} alt="" />
        </span>
        {error && <p style={{ color: "orange" }}>{error.message}</p>}
      </div>
    );
  }

  // Hvis typen er radio
  if (type === "radio") {
    return (
      <div
        className={style.InputStyling}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>{label}</label>
        {options.map((option) => (
          <div
            key={option.value}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              id={option.value}
              type="radio"
              name={name}
              value={option.value}
              {...register(name, validation)}
            />
            <label htmlFor={option.value} style={{ marginLeft: "0.5vw" }}>
              {option.label}
            </label>
          </div>
        ))}
        {error && <p style={{ color: "orange" }}>{error.message}</p>}
      </div>
    );
  }

  // Hvis typen er Select
  if (type === "select") {
    return (
      <div
        className={style.InputStyling}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "",
          }}
        >
          <option value="">{selectPlaceholder || `Vælg ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p style={{ color: "orange" }}>{error.message}</p>}
      </div>
    );
  }
};
