import { useTheme } from '../ThemeContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';
import { Link } from 'react-router-dom';


function Auth() {
  const [username_or_email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://gaspsacho21.pythonanywhere.com/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username_or_email, password }),
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      const data = await response.json();
      
      setToken(data.token);
      console.log('JWT токен:', data.token);
      
      localStorage.setItem('jwt', data.token);
      
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='center-page'>
      <form className='authorize' onSubmit={handleSubmit}>
        <h2 className='auth__title'>Авторизация</h2>
        <div className='form__group'>
          <input
            className='form__input'
            type='text'
            name='login'
            placeholder=' '
            value={username_or_email}
            onChange={(e) => setLogin(e.target.value)}
          />
          <label className='form__label'>Введите логин или Email</label>
        </div>
        <div className='form__group'>
          <input
            className='form__input'
            type='password'
            name='password'
            placeholder=' '
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className='form__label'>Введите пароль</label>
        </div>
        <button type='submit' className='authButton'>Войти</button><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to='/reg' style={{textDecoration: 'none'}}><span className='regPage'>У меня нет аккаунта</span></Link>
      </form>
    </div>
  );
}

export default Auth;