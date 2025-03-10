import style from './SectionWrapper.module.scss'

export const SectionWrapper = ({children, customStyling}) => {
  return (
    <section className={`${style.sectionStyling} ${style[customStyling]}`}>{children}</section>
  )
}