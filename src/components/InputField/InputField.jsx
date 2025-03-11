import style from "./InputField.module.scss";

export const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  error,
  options = [],
  imgSRC,
  custom,
  selectPlaceholder,
}) => {
  const defaultPlaceholder = placeholder || `Indtast ${label}`;

  // Hvis typen er checkbox
  if (type === "checkbox") {
    return (
      <div className={style.InputStyling}>
        <input
          id={name}
          type="checkbox"
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
          }}
        />
        <label htmlFor={name}>{label}</label>
        {error && <p style={{ color: "orange" }}>{error.message}</p>}
      </div>
    );
  }

  // Hvis typen er hverken radio, select eller checkbox
  if (type !== "radio" && type !== "select" && type !== "checkbox") {
    return (
      <div
        className={`${style.InputStyling} ${style[custom]}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          placeholder={defaultPlaceholder}
          type={type}
          autoComplete="on"
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
          }}
        />
        <img src={imgSRC} alt="" />
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
            border: error ? "1px solid orange" : "1px solid #ccc",
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
