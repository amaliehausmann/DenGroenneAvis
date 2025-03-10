import style from "./Button.module.scss";

export const Button = ({ action, color, size, title, children, custom }) => {
  return (
    <button
      className={`${style.buttonStyling} ${style[size]} ${style[color]} ${style[custom]}`}
      onClick={action}
    >
      {title}
      {children}
    </button>
  );
};
