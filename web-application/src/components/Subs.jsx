import './popup.css';
import { useTheme } from '../ThemeContext';
import { useState, useEffect } from 'react';
import profileImage from './images/Profile_avatar_placeholder_large.png';
import { Link } from 'react-router-dom';


function Subs({ onClose }) {
  const { theme } = useTheme();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    fetch('https://gaspsacho21.pythonanywhere.com/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return res.json();
      })
      .then(data => {
        // Преобразуем данные из API в нужный формат
        const formattedSubs = data.follows_list.map(item => ({
          id: item.followed_id,
          nickname: item.followed_nickname,
          avatarUrl: item.avatar_url || null // Добавляем аватар, если он есть в API
        }));
        
        setSubscriptions(formattedSubs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className={`popup ${theme}`} onClick={handleBackgroundClick}>
        <div className={`subscribe-form ${theme}`}>
          <h2 className={`form-title ${theme}`}>Ваши подписки</h2>
          <p className={`subs-form-p ${theme}`} style={{textAlign: 'center'}}>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`popup ${theme}`} onClick={handleBackgroundClick}>
        <div className={`subscribe-form ${theme}`}>
          <h2 className={`form-title ${theme}`}>Ваши подписки</h2>
          <p className={`subs-form-p ${theme}`} style={{textAlign: 'center'}}>Ошибка: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`popup ${theme}`} onClick={handleBackgroundClick}>
      <div className={`subscribe-form ${theme}`}>
        <h2 className={`form-title ${theme}`}>Ваши подписки</h2>
        <ul className={`subs-list ${theme}`}>
          {subscriptions.length > 0 ? (
            subscriptions.map((sub) => {
              // Формируем URL аватарки для каждого подписчика
              const avatarUrl = sub.id 
                ? `https://gaspsacho21.pythonanywhere.com/users/${sub.id}/avatar`
                : profileImage;

              return (
                <li key={sub.id}>
                  <img 
                    src={avatarUrl} 
                    alt="Аватар"
                    onError={(e) => {
                      e.target.src = profileImage; // Fallback при ошибке загрузки
                    }}
                    className="subs-avatar"
                  />
                  <Link to={`/profile/users/${sub.id}`} className={`subs-link ${theme}`}>
                    {sub.nickname}
                  </Link>
                </li>
              );
            })
          ) : (
            <p className={`subs-form-p ${theme}`} style={{textAlign: 'center'}}>
              Нет подписок
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Subs;