import './header.css';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';

function Header() {

  const { theme, toggleTheme } = useTheme();

    return (
      <header className={`header ${theme}`}>
        <div className="container">
            <div className={`logo ${theme}`}>
                <h1>Galaxy</h1>
            </div>
            <div className={`input-wrapper ${theme}`}>
                <input type="text" placeholder="Поиск..." />
            </div>
            <div className={`buttons-wrapper ${theme}`}>
              <Link to="/profile/me">
                  <button id='profile-button' className={`header-button ${theme}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px">
                          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
                      </svg>
                  </button>
              </Link>
                <button id='theme-button' className={`header-button ${theme}`} onClick={toggleTheme}>
                    {theme === 'light' ? (
                        <svg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 -960 960 960' width='18px'><path d='M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z'/></svg>
                    ) : (
                        <svg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 -960 960 960' width='18px'><path d='M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z'/></svg>
                    )}
                </button>
            </div>
        </div>
      </header>
    );
  }
  
  export default Header;
