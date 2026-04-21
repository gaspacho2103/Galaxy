import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../ThemeContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import Write from '../components/Write';
import Subs from '../components/Subs';
import Contacts from '../components/Contacts';
import ProfileCard from '../components/ProfileCard';
import './profile.css';

// Конфигурация API
const API_CONFIG = {
  baseUrl: 'http://127.0.0.1:5000',
  getHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    };
  }
};

// Функции запросов
const fetchUserData = async ({ queryKey }) => {
  const [_, { id, pathname }] = queryKey;
  let endpoint;
  
  if (pathname.includes('/profile/me')) {
    endpoint = '/users/me';
  } else if (id) {
    endpoint = `/users/${id}`;
  } else {
    throw new Error('Invalid profile URL');
  }

  const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
    headers: API_CONFIG.getHeaders()
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

const fetchPostsData = async ({ queryKey }) => {
  const [_, { id, pathname }] = queryKey;
  let endpoint;
  
  if (pathname.includes('/profile/me')) {
    endpoint = '/users/posts/me';
  } else if (id) {
    endpoint = `/users/posts/${id}`;
  } else {
    throw new Error('Invalid posts URL');
  }

  const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
    headers: API_CONFIG.getHeaders()
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  return Array.from(new Map(data.map(post => [post.post_id, post])).values());
};

function Profile() {
  const { theme } = useTheme();
  const [openPopupId, setOpenPopupId] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Запрос данных пользователя с автоматическим рефетчем
  const { 
    data: userData, 
    isLoading: loadingUser, 
    isError: isErrorUser,
    error: errorUser,
    refetch: refetchUser
  } = useQuery({
    queryKey: ['userData', { id, pathname: location.pathname }],
    queryFn: fetchUserData,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });

  // Запрос постов с зависимостью от userData
  const { 
    data: postsData, 
    isLoading: loadingPosts, 
    isError: isErrorPosts,
    error: errorPosts,
    refetch: refetchPosts
  } = useQuery({
    queryKey: ['postsData', { id, pathname: location.pathname }],
    queryFn: fetchPostsData,
    retry: 1,
    enabled: !!userData,
    refetchOnWindowFocus: true
  });

  // Общий рефетч данных
  const refetchAll = () => {
    refetchUser();
    if (userData) refetchPosts();
  };

  const openPopup = (id) => setOpenPopupId(id);
  const closePopup = () => setOpenPopupId(null);

  // Комбинированные состояния
  const isLoading = loadingUser || (loadingPosts && !!userData);
  const isError = isErrorUser || isErrorPosts;

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
            <p>{errorUser?.message || errorPosts?.message}</p>
            <button 
              onClick={refetchAll}
              className={`retry-button ${theme}`}
            >
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
        
        {openPopupId === 'write' && (
          <Write 
            onClose={closePopup} 
            onSuccess={() => {
              refetchPosts();
              queryClient.invalidateQueries(['postsData']);
            }}
          />
        )}
        {openPopupId === 'subs' && <Subs onClose={closePopup} />}
        {openPopupId === 'contacts' && <Contacts onClose={closePopup} />}

        <div className="posts">
          <ProfileCard 
            userData={userData} 
            onOpenPopup={openPopup} 
            isOwnProfile={location.pathname.includes('/profile/me')}
            onUpdate={() => refetchUser()}
          />
          <Post 
            posts={postsData || []} 
            onPostUpdate={refetchPosts}
          />
        </div>
      </main>
    </div>
  );
}

export default Profile;
