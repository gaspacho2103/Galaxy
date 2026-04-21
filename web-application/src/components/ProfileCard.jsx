import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from '../ThemeContext';
import React, { useState, useEffect, useRef, useContext } from 'react';
import './profileCard.css';
import Write from '../components/Write';
import profileImage from './images/Profile_avatar_placeholder_large.png';
import { Link } from 'react-router-dom';
import { ToastContext } from '../ToastContext';

function ProfileCard({ userData, onOpenPopup, isOwnProfile }) {
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [openPopupId, setOpenPopupId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    username: userData.username,
    description: userData.description || "Новый пользователь Galaxy"
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { addToast } = useContext(ToastContext);

  let avatarUrl = userData.avatar_url 
  ? `https://gaspsacho21.pythonanywhere.com/${userData.avatar_url}`
  : null;

  // Функция для получения подписок
  const fetchSubscriptions = async () => {
    const token = localStorage.getItem('jwt');
    const url = isOwnProfile
      ? 'https://gaspsacho21.pythonanywhere.com/users/me'
      : `https://gaspsacho21.pythonanywhere.com/users/${userData.user_id}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Ошибка загрузки подписок');
    const data = await response.json();
    return data.follows_list || [];
  };

  // Функция для проверки подписки
  const checkSubscription = async () => {
    const token = localStorage.getItem('jwt');
    const response = await fetch('https://gaspsacho21.pythonanywhere.com/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.follows_list?.some(user => user.followed_id === userData.user_id) || false;
  };

  // Функция подписки/отписки с обработкой toast-уведомлений
  const handleSubscription = async () => {
    const token = localStorage.getItem('jwt');
    const method = isSubscribed ? 'DELETE' : 'POST';
    const endpoint = 'subscribe';
    
    const response = await fetch(
      `https://gaspsacho21.pythonanywhere.com/users/${endpoint}/${userData.user_id}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(isSubscribed ? 'Не удалось отписаться' : 'Не удалось подписаться');
    }
    return response.json();
  };

  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ['subscriptions', userData.user_id, isOwnProfile],
    queryFn: fetchSubscriptions,
    enabled: !!userData.user_id,
  });

  const { data: isSubscribed } = useQuery({
    queryKey: ['subscriptionStatus', userData.user_id],
    queryFn: checkSubscription,
    enabled: !isOwnProfile && !!userData.user_id,
  });

  // Mutation для подписки/отписки
  const subscriptionMutation = useMutation({
    mutationFn: handleSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries(['subscriptionStatus', userData.user_id]);
      queryClient.invalidateQueries(['userData']);
      addToast({
        message: isSubscribed ? 'Подписка снята' : 'Подписка оформлена',
        type: 'success'
      });
    },
    onError: (error) => {
      addToast({
        message: error.message || 'Произошла ошибка',
        type: 'error'
      });
    }
  });

  const openPopup = (id) => setOpenPopupId(id);
  const closePopup = () => setOpenPopupId(null);

  // Сохранение данных профиля с toast-уведомлениями
  const handleSave = async () => {
    const token = localStorage.getItem('jwt');
    const formData = new FormData();
    
    formData.append('username', editedData.username);
    formData.append('description', editedData.description);
    
    if (fileInputRef.current?.files?.[0]) {
      formData.append('avatar', fileInputRef.current.files[0]);
    }

    try {
      const response = await fetch('https://gaspsacho21.pythonanywhere.com/users/me', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Ошибка сохранения данных');

      setIsEditing(false);
      queryClient.invalidateQueries(['userData']);
      addToast({
        message: 'Профиль обновлен',
        type: 'success'
      });
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      addToast({
        message: error.message || 'Ошибка при обновлении профиля',
        type: 'error'
      });
    }
  };

  // Обработка изменения аватара
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast({
          message: 'Файл слишком большой (макс. 5MB)',
          type: 'warning'
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      addToast({
        message: 'Новое изображение выбрано',
        type: 'info'
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`profile-card ${theme}`}>
      <div className={`edit-wrapper ${theme}`}>
        {isOwnProfile && (
          <button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="21px" fill="#fafafa">
              {isEditing ? (
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
              ) : (
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
              )}
            </svg>
          </button>
        )}
      </div>

      <div className="profile-container">
        <div className="profile-wrapper">
          <div className="image-wrapper">
            <img 
              src={avatarPreview || avatarUrl || profileImage} 
              alt=""
              onError={(e) => {
                        e.target.src = profileImage;
                }}
              onClick={isEditing ? triggerFileInput : undefined}
              style={isEditing ? { cursor: 'pointer' } : {}}
            />
            {isEditing && (
              <div 
                className='edit-img-overlay'
                onClick={triggerFileInput}
              >
                <div className='edit-img-circle'>
                  <span>+</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="p-info-wrapper">
            {isEditing ? (
              <input
                type="text"
                value={editedData.username}
                onChange={(e) => setEditedData({...editedData, username: e.target.value})}
                className={`profile-title-input ${theme}`}
                placeholder='Введите новый никнейм'
              />
            ) : (
              <div className={`profile-title ${theme}`}>
                {userData.username}
              </div>
            )}

            <div className="profile-desc">
              {isEditing ? (
                <textarea
                  value={editedData.description}
                  onChange={(e) => setEditedData({...editedData, description: e.target.value})}
                  className={`p-desc-input ${theme}`}
                  placeholder='Введите описание'
                />
              ) : (
                <p className={`p-desc ${theme}`}>{editedData.description}</p>
              )}
            </div>

            <div className={`p-card-wrapper ${theme}`}>
              <div className={`info-card ${theme}`}>
                <p className={`sub-title ${theme}`}>Подписчики</p>
                <p>{userData.followers_count}</p>
              </div>
              <div className={`info-card ${theme}`}>
                <p className={`sub-title ${theme}`}>Посты</p>
                <p>{userData.post_count}</p>
              </div>
              <div className={`info-card ${theme}`}>
                <p className={`sub-title ${theme}`}>Регистрация</p>
                <p>{userData.created_at}</p>
              </div>
            </div>

            <div className={`button-wrapper ${theme}`}>
              {isOwnProfile ? (
                <button onClick={() => onOpenPopup('write')}>Написать</button>
              ) : (
                <button 
                  onClick={() => subscriptionMutation.mutate()}
                  disabled={subscriptionMutation.isLoading}
                  className={isSubscribed ? 'unsubscribe-btn' : 'subscribe-btn'}
                >
                  {subscriptionMutation.isLoading ? '...' : isSubscribed ? 'Отписаться' : 'Подписаться'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`subs-card ${theme}`}>
        <h4 className='under-title'>
          {isOwnProfile ? 'Ваши подписки' : `Подписки ${userData.username}`}
        </h4>
        
        <div className={`subs-form ${theme}`}>
          {isLoading ? (
            <p className={`subs-form-p ${theme}`} style={{textAlign: 'center'}}>Загрузка...</p>
          ) : subscriptions?.length > 0 ? (
            <ul className={`subs-list ${theme}`}>
              {subscriptions.map((sub) => {
                const subAvatarUrl = sub.followed_id 
                  ? `https://gaspsacho21.pythonanywhere.com/users/${sub.followed_id}/avatar`
                  : profileImage;

                return (
                  <li key={sub.followed_id}>
                    <img 
                      src={subAvatarUrl} 
                      alt="Аватар"
                      className="subs-avatar"
                      onError={(e) => {
                        e.target.src = profileImage;
                      }}
                    />
                    <Link to={`/profile/users/${sub.followed_id}`}>
                      {sub.followed_nickname}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={`subs-form-p ${theme}`} style={{textAlign: 'center'}}>
              {isOwnProfile ? 'Вы ни на кого не подписаны' : 'Пользователь ни на кого не подписан'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
