import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';
import profileImage from './images/Profile_avatar_placeholder_large.png';
import './Post.css';
import { ToastContext } from '../ToastContext';

function Post({ posts }) {
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [commentTextMap, setCommentTextMap] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());
  const { addToast } = useContext(ToastContext);


  const toggleComments = (postId) => {
    setShowCommentsMap(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentTextMap(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        addToast('Лайк снят с поста', 'success');
      } else {
        newSet.add(postId);
        addToast('Лайк поставлен', 'success');
      }
      return newSet;
    });
  };

  const commentMutation = useMutation({
    mutationFn: async ({ postId, content }) => {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`https://gaspsacho21.pythonanywhere.com/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
      
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setCommentTextMap(prev => {
        const newMap = { ...prev };
        Object.keys(newMap).forEach(key => { newMap[key] = '' });
        addToast('Комментарий оставлен', 'success');
        return newMap;
      });
    },
    onError: (error) => {
      console.error('Ошибка при отправке комментария:', error);
      alert('Не удалось отправить комментарий');
    }
  });

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const commentContent = commentTextMap[postId]?.trim();
    
    if (!commentContent) {
      alert('Пожалуйста, введите комментарий');
      return;
    }

    commentMutation.mutate({ postId, content: commentContent });
  };

  if (!posts || posts.length === 0) {
    return <div className={`no-posts ${theme}`}>Нет постов для отображения</div>;
  }

  return (
    <div className="posts-container">
      {posts.map(post => {
        const showComments = showCommentsMap[post.post_id] || false;
        const isLiked = likedPosts.has(post.post_id);
        const likesCount = post.likes_count + (isLiked ? 1 : 0);
        const avatarUrl = post.avatar_url 
          ? `https://gaspsacho21.pythonanywhere.com/${post.avatar_url}`
          : profileImage;
        

        return (
          <div key={post.post_id} className={`post ${theme}`}>
            <div className="info-wrapper">
              <div className="account-wrapper">
                <img 
                  src={avatarUrl} 
                  alt="Аватар"
                  onError={(e) => {
                    e.target.src = profileImage; // Fallback если изображение не загрузится
                  }} />
                <Link className={`username ${theme}`} to={`/profile/users/${post.user_id}`}>
                  {post.username}
                </Link>
              </div>
              <h5 className={`post-time ${theme}`}>{post.created_at}</h5>
            </div>

            <div className="images-wrapper">
              {post.pin_files?.length > 0 ? (
                post.pin_files.map(file => {
                  // Проверяем тип файла по расширению или MIME-типу
                  const fileExt = file.format.toLowerCase();
                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt);
                  const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExt);
                  const isAudio = ['mp3', 'wav', 'ogg', 'aac'].includes(fileExt);

                  return (
                    <div key={file.file_id} className="media-container">
                      {isImage ? (
                        <img
                          src={`data:image/${file.format};base64,${file.content_base64}`}
                          alt={file.filename}
                          className="media-content"
                        />
                      ) : isVideo ? (
                        <video controls className="media-content">
                          <source
                            src={`data:video/${file.format};base64,${file.content_base64}`}
                            type={`video/${file.format}`}
                          />
                          Ваш браузер не поддерживает видео.
                        </video>
                      ) : isAudio ? (
                        <audio controls className="audio-content">
                          <source
                            src={`data:audio/${file.format};base64,${file.content_base64}`}
                            type={`audio/${file.format}`}
                          />
                          Ваш браузер не поддерживает аудио.
                        </audio>
                      ) : (
                        <div className="unsupported-media">
                          <p>Неподдерживаемый формат файла</p>
                          <a
                            href={`data:application/octet-stream;base64,${file.content_base64}`}
                            download={file.filename}
                          >
                            Скачать файл
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : null}
            </div>

            <h2 className={`post-title ${theme}`}>{post.title}</h2>
            <p className={`post-desc ${theme}`}>{post.content}</p>

            <div className="active-wrapper">
              <div className={`active-btn ${theme}`} onClick={() => handleLike(post.post_id)}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="24px" 
                  viewBox="0 -960 960 960" 
                  width="24px" 
                  fill={isLiked ? 'red' : theme === 'dark' ? '#ebebeb' : '#333'}
                >
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                </svg>
                <p className={`active-count ${theme}`}>{likesCount}</p>
              </div>

              <div className={`active-btn ${theme}`} onClick={() => toggleComments(post.post_id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" 
                  fill={theme === 'dark' ? '#ebebeb' : '#333'}>
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480z" />
                </svg>
                <p className={`active-count ${theme}`}>{post.comments_count}</p>
              </div>
            </div>

            {showComments && (
              <div className="comments-wrapper">
                <h3 className={`comment-title ${theme}`}>Комментарии:</h3>
                  {post.comment_list?.length > 0 ? (
                    post.comment_list.map(comment => {
                      const commentAvatarUrl = comment.avatar_url 
                        ? `https://gaspsacho21.pythonanywhere.com/${comment.avatar_url}`
                        : profileImage;

                      return (
                        <div key={comment.comment_id} className="comment">
                          <div className="account-wrapper">
                            <img 
                              src={commentAvatarUrl} 
                              alt="Аватар"
                              onError={(e) => {
                                e.target.src = profileImage; // Fallback если изображение не загрузится
                              }} />
                            <Link className={`username ${theme}`} to={`/profile/users/${comment.user_id}`}>
                              {comment.username}
                            </Link>
                          </div>
                          <p className={`content ${theme}`}>{comment.content}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p className={`no-comments ${theme}`}>Нет комментариев</p>
                  )}
                <form onSubmit={(e) => handleCommentSubmit(e, post.post_id)} className="add-comment">
                  <input
                    type="text"
                    className={`comment-input ${theme}`}
                    placeholder="Оставьте свой комментарий"
                    value={commentTextMap[post.post_id] || ''}
                    onChange={(e) => handleCommentChange(post.post_id, e.target.value)}
                    disabled={commentMutation.isLoading}
                  />
                  <button type="submit" className={`c-sender-button ${theme}`} disabled={commentMutation.isLoading}>
                    {commentMutation.isLoading ? (
                      'Отправка...'
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fafafa">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Post;