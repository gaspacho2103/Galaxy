import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import Write from '../components/Write';
import Subs from '../components/Subs';
import Contacts from '../components/Contacts';
import { useTheme } from '../ThemeContext';
import './home.css';

function Home() {
  const { theme } = useTheme();
  const [openPopupId, setOpenPopupId] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const queryClient = useQueryClient();
  const location = useLocation();

  // Получаем тему из URL параметров
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const topic = searchParams.get('topic');
    setCurrentTopic(topic);
  }, [location.search]);

  const fetchPosts = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('Требуется авторизация');
    
    // Добавляем параметр темы в URL запроса, если она выбрана
    let url = 'https://gaspsacho21.pythonanywhere.com/posts';
    let topicRus = getTopicName(currentTopic);
    if (topicRus) {
      url += `/topic/${topicRus}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 422) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Неверные данные запроса');
      }
      throw new Error(`Ошибка: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.from(new Map(data.map(post => [post.post_id, post])).values());
  };

  const { 
    data: postsData, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['posts', currentTopic], // Добавляем тему в ключ запроса
    queryFn: fetchPosts,
    retry: 1,
    staleTime: 2 * 60 * 1000,
  });

  const openPopup = (id) => setOpenPopupId(id);
  const closePopup = () => setOpenPopupId(null);

  if (isLoading) {
    return (
      <div className={`home ${theme}`}>
        <Header />
        <main className='main'>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className={`load-text ${theme}`}>Загрузка данных...</p>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`home ${theme}`}>
        <Header />
        <main className='main'>
          <div className="error-container">
            <p>{error?.message}</p>
            <button onClick={() => refetch()}>
              Повторить попытку
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`home ${theme}`}>
      <Header />
      <main className='main'>
        <Sidebar onOpenPopup={openPopup} />
        
        {openPopupId === 'write' && <Write onClose={closePopup} />}
        {openPopupId === 'subs' && <Subs onClose={closePopup} />}
        {openPopupId === 'contacts' && <Contacts onClose={closePopup} />}
        
        <div className="posts">

          <Post posts={postsData || []} />
        </div>
      </main>
    </div>
  );
}

// Вспомогательная функция для получения названия темы по slug
function getTopicName(slug) {
  const topics = {
    'popular': 'Популярное',
    'games': 'Игры',
    'it': 'IT',
    'movies': 'Фильмы',
    'sport': 'Спорт',
    'artists': 'Исполнители'
  };
  return topics[slug] || slug;
}

export default Home;