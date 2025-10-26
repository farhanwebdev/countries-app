import { useTheme } from '../contexts/ThemeContext'
import './Header.css'


const Header = () => {

  const {theme, toggleTheme} = useTheme()

  const icon = theme === 'light' ? '🌙' : '☀️';
  const text = theme === 'light' ? 'Dark mode' : 'Light Mode'

  return (
    <nav data-theme={theme}>
       <div className="inside_nav">
         <h2>Where in the World?</h2>
        <div className='darkMode_div' onClick={toggleTheme}>
            <span>{icon}</span>
            <p>{text}</p>
        </div>
       </div>
    </nav>
  )
}

export default Header
