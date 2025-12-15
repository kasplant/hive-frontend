import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
const getClassName = getClassNameFactory('Card', styles)


export const Card = ({
  name,
  date,
  subname,
  buttons
}: {
  name: string
  date: string
  subname: string
  buttons?: {
    type: "primary" | "secondary"
    text: string
    href: string
  }[]
}) => {
  return (
    <div className={getClassName()}>
      <div className={getClassName("nav")}>
        <p className={getClassName("nav-title")}>{name}</p>
        <p className={getClassName("nav-subtitle")}>{subname}</p>
        <p className={getClassName("nav-date")}>{date}</p>
      </div>

      <div className={getClassName("footer")}>
        {buttons?.map((btn, index) => (
          <a key={index} href={btn.href}>
            <button
              className={getClassName(
                btn.type === "primary"
                  ? "footer-primarybutton"
                  : "footer-secondarybutton"
              )}
            >
              {btn.text}
            </button>
          </a>
        ))}
      </div>
    </div>
  )
}
