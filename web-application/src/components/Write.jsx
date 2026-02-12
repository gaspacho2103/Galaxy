import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './popup.css';
import { useTheme } from '../ThemeContext';
import { useContext } from 'react';
import { ToastContext } from '../ToastContext';

function Write({ onClose }) {
  const { theme } = useTheme();
  const fileInputRef = useRef(null);
  const titleRef = useRef(null);
  const topicRef = useRef(null);
  const descriptionRef = useRef(null);
  const queryClient = useQueryClient();
  const { addToast } = useContext(ToastContext);

  const token = localStorage.getItem('jwt');

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('https://gaspsacho21.pythonanywhere.com/posts', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onClose();
      addToast('Пост успешно добавлен!', 'success');
    },
    onError: (error) => {
      alert(`Ошибка: ${error.message}`);
      addToast(`Ошибка: ${error.message}`, 'error');
    }
  });

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const topic = topicRef.current.value;
    const fileInput = fileInputRef.current;
    
    if (fileInput.files[0]) {
      formData.append('file', fileInput.files[0]);
    }

    formData.append('title', title);
    formData.append('topic', topic);
    formData.append('content', description);

    createPostMutation(formData);
  };

  return (
    <div className={`popup ${theme}`} onClick={handleBackgroundClick}>
      <form className={`write-form ${theme}`} onSubmit={handleSubmit}>
        <h2 className={`form-title ${theme}`}>Напишите свой пост</h2>
        <div className={`form__group ${theme}`}>
          <input 
            ref={titleRef}
            className={`form__input ${theme}`} 
            type="text" 
            name="title" 
            id="title" 
            placeholder=" " 
            required
          />
          <label className={`form__label ${theme}`} htmlFor="title">Ваш заголовок:</label>
        </div>
        <div className={`form__group ${theme}`}>
          <select ref={topicRef} className={`form__input ${theme}`} name='topic' id='topic' required>
            <option value="">Выберите тему</option>
            <option value="Игры">Игры</option>
            <option value="IT">IT</option>
            <option value="Фильмы">Фильмы</option>
            <option value="Спорт">Спорт</option>
            <option value="Исполнители">Исполнители</option>
          </select>
          <label className={`form__label ${theme}`} htmlFor="topic">Тема поста:</label>
        </div>
        <div className={`form__group ${theme}`}>
          <textarea 
            ref={descriptionRef}
            name="description" 
            id="desc" 
            className={`form__input ${theme}`} 
            placeholder=" " 
            required
          ></textarea>
          <label className={`form__label ${theme}`} htmlFor="desc">Ваши мысли:</label>
        </div>
        <div className="buttons-wrapper">
          <div className="attach-file">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }}
            />
            <button 
              type="button"
              className="attach-button" 
              onClick={() => fileInputRef.current.click()}
              disabled={isPending}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill={theme === 'dark' ? '#ebebeb' : '#1f1f1f'}>
                <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/>
              </svg>
            </button>
          </div>
          <button 
            type="submit" 
            className={`send-button ${theme}`}
            disabled={isPending}
          >
            {isPending ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Write;