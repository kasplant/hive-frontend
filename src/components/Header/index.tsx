import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
import { useLocation, useNavigate } from 'react-router-dom'
const getClassName = getClassNameFactory('Header', styles)


export const Header = ({ title, description }: { title: string; description: string }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const showBackButton = location.pathname !== '/'

  const handleBack = () => {
    if (pathParts[0] === 'hives' && pathParts[2] === 'inspections' && pathParts[1]) {
      navigate(`/hives/${pathParts[1]}`)
      return
    }

    window.history.back()
  }
  
  return (
    <div className={getClassName()}>
        <h1 className={getClassName('title')}>{title}</h1>
        <p className={getClassName('description')}>{description}</p>
        {showBackButton && <button className={getClassName('back-button')} onClick={handleBack}> Terug</button>}
    </div>
  )
}
