import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://gaspsacho21.pythonanywhere.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        
        const errorData = await response.json();
        alert(errorData.message || 'Ошибка регистрации');
        return;
      }

      window.location.href = '/';
      


    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Произошла ошибка при регистрации');
    }
  };

  return (
    <div className='center-page'>
      <form className="register" onSubmit={handleSubmit}>
        <h2 className="reg__title">Регистрация</h2>
        <div className="form__group">
          <input
            className="form__input"
            type="text"
            name="username"
            placeholder=" "
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label className="form__label">Придумайте логин</label>
        </div>
        <div className="form__group">
          <input
            className="form__input"
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="form__label">Введите ваш email</label>
        </div>
        <div className="form__group">
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="form__label">Придумайте пароль</label>
        </div>
        <button type="submit" className="regButton">Создать аккаунт</button><br />
        <Link to='/auth' style={{ textDecoration: 'none' }}><span className='authPage'>У меня есть аккаунт</span></Link>
      </form>
    </div>
  );
}

export default Register;