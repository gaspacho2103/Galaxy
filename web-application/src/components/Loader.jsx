// components/Loader.jsx
import { useTheme } from '../ThemeContext';

export function Loader() {
  const { theme } = useTheme();
  return (
    <div className={`loader ${theme}`}>
      <div className="loader-spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
}