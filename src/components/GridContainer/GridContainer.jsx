import style from "./GridContainer.module.scss";

export const GridContainer = ({ children, columns, gap }) => {
  return (
    <section className={`${style.gridStyling} ${style[`column-${columns}`]} ${style[`gap-${gap}`]}`}>
      {children}
    </section>
  );
};
