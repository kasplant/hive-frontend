import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
import Demo from './collapsible'
const getClassName = getClassNameFactory('Card', styles)


export const Card = ({
  name,
  subname,
  temperature,
  humidity,
  created_at,
  updated_at,
  buttons,
  showCollapsible = true
}: {
  name: string
  subname?: string
  temperature?: number | null
  humidity?: number | null
  created_at?: string
  updated_at?: string
  buttons?: {
    type: "primary" | "secondary"
    text: string
    href: string
  }[]
  showCollapsible?: boolean
}) => {
  const formatDate = (d?: string) => (d ? new Date(d).toLocaleString() : "—")
  return (
    <div className={getClassName()}>
      <div className={getClassName("nav")}>
        <p className={getClassName("nav-title")}>{name}</p>
      </div>

      <div className={getClassName("meta")}> 
        <p>
          <strong>Aangemaakt:</strong>&nbsp;{formatDate(created_at)}
        </p>
        <p>
          <strong>Bijgewerkt:</strong>&nbsp;{formatDate(updated_at)}
        </p>
      </div>

      {showCollapsible && (
        <Demo
          temperature={temperature}
          humidity={humidity}
        />
      )}

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
