import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
const getClassName = getClassNameFactory('Header', styles)


export const Header = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className={getClassName()}>
        <h1 className={getClassName('title')}>{title}</h1>
        <p className={getClassName('description')}>{description}</p>
        <button className={getClassName('back-button')} onClick={() => window.history.back()}> Terug
        </button>
    </div>
  )
}
