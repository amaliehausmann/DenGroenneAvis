import style from './Card.module.scss'

export const Card = ({image, title, description, children, custom, action, alttext,ariaLabel}) => {
  return (
    <div onClick={action} aria-label={ariaLabel} className={`${style.cardStyling} ${style[custom]}`}>
        <img src={`${image}`} alt={alttext} />
        <h5>{title}</h5>
        <p>{description}</p>
        <div>
        {children}
        </div>
    </div>
  )
}