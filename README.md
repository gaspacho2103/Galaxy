<h1 align="center">🌌 Добро пожаловать в Galaxy!</h1>

<br />

<p align="center">
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3126e023-00f9-41cc-9cb7-2f4116d57daf" />
</p>

<br />

---

<h3>🧐 Что это такое?</h3>

**Galaxy** — это импровизированная социальная сеть форумного типа.  
Проект написан на связке **React + Python Flask** с использованием **REST API**.

Здесь можно:
- ✍️ Писать посты (с картинками, видео или аудио)
- ❤️ Ставить лайки и оставлять комментарии
- 👥 Подписываться на других пользователей
- 📊 Смотреть статистику в профиле (подписчики, посты, подписки)
- ✏️ Редактировать свой профиль (аватар, никнейм, описание)

<br />

---

<h3>👨‍💻 Технологии</h3>

<ul>
  <li><img src="https://img.icons8.com/color/18/000000/react-native.png" width="18" height="18" style="vertical-align: middle;" /> <strong>React JS</strong> — интерфейс</li>
  <li>⚛️ <strong>react-query</strong> — управление состоянием и кэширование данных</li>
  <li><img src="https://img.icons8.com/color/18/000000/python.png" width="18" height="18" style="vertical-align: middle;" /> <strong>Python Flask</strong> — бэкенд</li>
  <li>🔁 <strong>REST API</strong> — архитектура взаимодействия</li>
  <li>🔐 <strong>Flask JWT</strong> — аутентификация</li>
  <li><img src="https://img.icons8.com/color/18/000000/mysql-logo.png" width="18" height="18" style="vertical-align: middle;" /> <strong>MySQL</strong> — база данных</li>
</ul>

<br />

---

### ⚙️ Установка (локальный сервер)

> Перед установкой убедитесь, что у вас есть **Python 3.13+**, **Node.js** и **MySQL**.

<br />

<b>Шаг 1: Клонирование репозитория</b><br />
Скачайте архив или выполните в терминале:

```bash
git clone https://github.com/gaspacho2103/galaxy.git
cd galaxy
```
<p align="center"> <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e2ed3cf1-436c-4b04-9164-da9858ec5c24" /><br /><br /><img width="740" height="423" alt="image" src="https://github.com/user-attachments/assets/d5ee0d09-bcc7-454f-94a4-07d6feb09d46" />
</p><br />
<b>Шаг 2: Настройка базы данных</b><br />
Откройте MySQL WorkBench (или другую СУБД), создайте подключение. <br /><br />

<p align="center"><img width="1920" height="1080" alt="mysql" src="https://github.com/user-attachments/assets/6a31d269-e149-4ec8-b280-fbf06f39bf9c" /></p><br />
Выполните скрипт galaxydb.sql — выполните все незакомментированные запросы. <br /><br />

<p align="center"<img width="1920" height="1080" alt="sql_import" src="https://github.com/user-attachments/assets/c7b1123c-8414-4c2d-bb1d-c522f7ced7d6" /></p><br />
<b>Шаг 3: Бэкенд (Flask)</b><br />
Откройте galaxy/rest-api/config.py и укажите в host IP‑адрес вашего сервера с базой данных. <br /><br />

<p align="center"><img width="798" height="492" alt="config" src="https://github.com/user-attachments/assets/ceddada5-8cb7-4c14-876d-64b2ef425c9b" /> </p><br />
Установите зависимости и запустите API:<br />

bash
```
pip install flask flask-jwt-extended flask-cors
python main.py
```
<p align="center"> <img width="797" height="213" alt="flask_run" src="https://github.com/user-attachments/assets/81b43710-a026-431c-938b-4abeab542bd7" /> </p><br/>
<b>Шаг 4: Фронтенд (React)</b><br />
Скопируйте IP‑адрес сервера API (он отобразится в терминале) и вставьте во все строки, где используется react-query или await fetch.<br /><br />

<p align="center"> <img width="1920" height="1080" alt="api_ip" src="https://github.com/user-attachments/assets/d76f2c35-091c-47dc-808e-9d0aab3b855d" /> </p><br />
Установите зависимости и запустите React:<br />

bash
```
npm install
npm run dev
```
<p align="center"> <img width="1335" height="239" alt="react_start" src="https://github.com/user-attachments/assets/86e0ebc3-ff82-4e02-a54c-2364b0f84d52" /> </p><br /><br />
✅ Готово! Проект успешно запущен.<br /><br />

<p align="center"> <img width="1920" height="1080" alt="final" src="https://github.com/user-attachments/assets/c03acc0c-3ee9-40a9-a857-5001507dd79b" /> </p><br /><br />
<hr>
<h3>🧭 Руководство пользователя</h3><br />
<h5>🔐 Регистрация и авторизация</h5><br />
После запуска создайте аккаунт.<br /><br />

<p align="center"> <img width="1920" height="955" alt="register" src="https://github.com/user-attachments/assets/c3f74810-7ff0-459e-a3cb-c1b931dcda3d" /> </p><br />
Затем войдите, используя указанные данные.<br /><br />

<p align="center"> <img width="1920" height="955" alt="login" src="https://github.com/user-attachments/assets/1a2bf621-a0bf-449b-bec8-9374d96dd4b8" /> </p><br />
<h5>🏠 Главная страница</h5><br />
После входа откроется лента постов.<br />
В шапке — поиск, кнопка профиля, переключатель темы.<br />
Слева — сайдбар с кнопками:<br />

✏️ «Написать»<br />

👥 «Подписки»<br />

🚪 «Выйти»<br />

Ниже — навигация по темам (топики).<br />

<p align="center"> <img width="1920" height="956" alt="dark" src="https://github.com/user-attachments/assets/e7af3117-0401-46ee-8493-eea62ab04913" /><br /> <strong>🌙 Тёмная тема (по умолчанию)</strong></p><p align="center"><br /> <img width="1920" height="954" alt="light" src="https://github.com/user-attachments/assets/45546a5b-8240-45fb-b6b0-ed9e0812a352" /><br /><strong>☀️ Светлая тема</strong></p><br />
<h5>✍️ Создание поста</h5><br />
Нажмите «Написать» → укажите заголовок, текст, выберите тему, при желании прикрепите файл.<br /><br />

<p align="center"> <img width="1920" height="953" alt="new_post" src="https://github.com/user-attachments/assets/3d497d93-9900-4a7b-91e0-f98c219ccf64" /> </p><br />
После создания появится уведомление, и пост отобразится в ленте.<br /><br />

<p align="center"> <img width="1920" height="954" alt="post_created" src="https://github.com/user-attachments/assets/d342e787-6c74-47c0-9d27-958e85ce185c" /> </p><br />
<h5>💬Взаимодействие</h5><br />
Посты можно лайкать и комментировать.<br /><br />

<p align="center"> <img width="1920" height="955" alt="like_comment" src="https://github.com/user-attachments/assets/c66d944d-c49b-4a7b-b337-58524f51aa29" /> </p><br />
<h5>👤 Профиль</h5><br />
Чтобы перейти в свой профиль — нажмите на кнопку профиля в шапке.<br />
Чтобы посмотреть профиль другого пользователя — кликните на его никнейм.<br />

В профиле отображаются:<br />

- статистика (подписчики, подписки, количество постов, дата регистрации)<br />

- никнейм, аватар, краткое описание<br />

- посты пользователя<br />

<p align="center"> <img width="1920" height="954" alt="profile" src="https://github.com/user-attachments/assets/89e6c332-4437-4f34-a27f-9e6e76e3dbad" /></p><br />
Редактирование профиля доступно по кнопке с карандашом ✏️ — можно сменить никнейм, аватар и описание.<br /><br />
<p align="center"><img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/6173cd41-df14-4ca0-9372-8bf780d78e3f" /></p><br />
<hr>
<h3>🎯 Для чего этот проект?</h3><br />
Это мой дипломный проект и по совместительству первый полноценный прототип социальной сети (форума), на котором я:<br />
<ul>
<li>🐍 осваивал написание API на Flask</li>

<li>⚛️ углублялся во фронтенд на React</li>

<li>🔐 разбирался с JWT‑токенами и REST‑архитектурой</li>

<li>🗄️ проектировал базу данных и связывал её с бэкендом</li>
</ul>

Здесь я учился строить клиент‑серверное приложение «с нуля», работать с файлами, темами оформления и выстраивать логику, приближенную к реальным проектам.<br />
