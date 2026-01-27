import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
import { useLocation } from 'react-router-dom'
const getClassName = getClassNameFactory('Header', styles)


export const Header = ({ title, description }: { title: string; description: string }) => {
  const location = useLocation()
  const showBackButton = location.pathname !== '/'
  
  return (
    <div className={getClassName()}>
        <h1 className={getClassName('title')}>{title}</h1>
        <p className={getClassName('description')}>{description}</p>
        {showBackButton && <button className={getClassName('back-button')} onClick={() => window.history.back()}> Terug</button>}
    </div>
  )
}
