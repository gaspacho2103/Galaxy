<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galaxy - социальная сеть форумного типа</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
            background: #f5f7fb;
            color: #1e293b;
            line-height: 1.5;
            padding: 2rem 1rem;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .content {
            padding: 2rem 2rem 3rem;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }

        h1 span {
            background: linear-gradient(135deg, #6366f1, #a855f7);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        h2 {
            font-size: 1.75rem;
            margin: 2rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid #e2e8f0;
        }

        h3 {
            font-size: 1.4rem;
            margin: 1.75rem 0 1rem;
            color: #0f172a;
        }

        .badge-container {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin: 1.5rem 0;
        }

        .badge {
            display: inline-block;
            background: #f1f5f9;
            padding: 0.3rem 0.9rem;
            border-radius: 40px;
            font-size: 0.85rem;
            font-weight: 500;
            color: #1e293b;
            text-decoration: none;
        }

        .badge img {
            vertical-align: middle;
            margin-right: 6px;
        }

        hr {
            margin: 2rem 0;
            border: none;
            height: 2px;
            background: linear-gradient(90deg, #e2e8f0, #cbd5e1, #e2e8f0);
        }

        .tech-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin: 1rem 0 0.5rem;
        }

        .tech-item {
            background: #f8fafc;
            padding: 0.4rem 1rem;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 500;
            border: 1px solid #e2e8f0;
        }

        img {
            max-width: 100%;
            border-radius: 16px;
            margin: 1.2rem 0;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
            border: 1px solid #eef2ff;
        }

        .img-caption {
            font-size: 0.85rem;
            text-align: center;
            color: #475569;
            margin-top: -0.8rem;
            margin-bottom: 1.2rem;
        }

        .step {
            background: #fefce8;
            border-left: 5px solid #eab308;
            padding: 0.8rem 1.2rem;
            margin: 1.5rem 0 1rem;
            border-radius: 12px;
            font-weight: 600;
        }

        code {
            background: #1e293b;
            color: #e2e8f0;
            padding: 0.2rem 0.5rem;
            border-radius: 8px;
            font-family: 'SF Mono', 'Menlo', monospace;
            font-size: 0.85rem;
        }

        pre {
            background: #0f172a;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 16px;
            overflow-x: auto;
            font-family: 'SF Mono', 'Menlo', monospace;
            font-size: 0.85rem;
            margin: 1.2rem 0;
        }

        blockquote {
            background: #f1f5f9;
            padding: 0.8rem 1.2rem;
            border-radius: 16px;
            margin: 1.2rem 0;
            font-style: italic;
            border-left: 4px solid #6366f1;
        }

        .button-icon {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #eef2ff;
            padding: 0.2rem 0.8rem;
            border-radius: 30px;
            font-size: 0.8rem;
        }

        footer {
            text-align: center;
            padding: 2rem 1rem;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            color: #475569;
        }

        @media (max-width: 680px) {
            .content {
                padding: 1.5rem;
            }
            h1 {
                font-size: 1.8rem;
            }
            h2 {
                font-size: 1.4rem;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <div class="content">
        <h1>
            <span>🌌 Galaxy</span>
        </h1>

        <!-- Badges / ссылки (можно заменить на реальные, если нужны) -->
        <div class="badge-container">
            <span class="badge">⚛️ React 18</span>
            <span class="badge">🐍 Flask</span>
            <span class="badge">🗄️ MySQL</span>
            <span class="badge">🔐 JWT</span>
            <span class="badge">📡 REST API</span>
        </div>

        <!-- главный скрин -->
        <img src="https://github.com/user-attachments/assets/9edae280-cebb-4bad-983d-112a32d11e87" alt="Galaxy preview" />

        <h2>📖 Что это такое?</h2>
        <p>
            <strong>Galaxy</strong> — это импровизированная социальная сеть форумного типа, написанная на 
            <strong>React JS + Python Flask</strong> с использованием архитектуры <strong>REST API</strong>.
            Здесь можно публиковать посты, добавлять файлы, ставить лайки, писать комментарии и подписываться на других пользователей.
        </p>
        <p>
            В профиле доступна статистика (подписчики, посты, подписки), а также возможность изменить аватар, никнейм или описание. 
            Интерфейс поддерживает светлую и тёмную темы.
        </p>

        <hr />

        <h2>🛠️ Технологии</h2>
        <div class="tech-grid">
            <span class="tech-item">⚛️ React JS</span>
            <span class="tech-item">📡 react-query</span>
            <span class="tech-item">🐍 Python Flask</span>
            <span class="tech-item">🔁 REST API</span>
            <span class="tech-item">🔐 Flask JWT</span>
            <span class="tech-item">🐬 MySQL</span>
        </div>

        <hr />

        <h2>🚀 Установка и запуск</h2>
        <p>Для локального запуска проекта выполните следующие шаги. Убедитесь, что установлены <strong>Python 3.13+</strong>, <strong>Node.js</strong> и <strong>MySQL</strong>.</p>

        <div class="step">📦 Шаг 1: Скачайте репозиторий</div>
        <p>Скачайте архив с GitHub или выполните:</p>
        <pre><code>git clone https://github.com/gaspacho2103/galaxy.git
cd galaxy</code></pre>
        <img src="https://github.com/user-attachments/assets/b276a76f-e17d-4f91-8495-dde9714ba4b2" alt="git clone" />
        <img src="https://github.com/user-attachments/assets/3ad9fb17-fb7f-4eb0-84d2-8d129ab94fbd" alt="структура" />

        <div class="step">🗄️ Шаг 2: Настройка базы данных</div>
        <p>Откройте MySQL Workbench (или другую СУБД) и создайте подключение.</p>
        <img src="https://github.com/user-attachments/assets/6a31d269-e149-4ec8-b280-fbf06f39bf9c" alt="workbench" />
        <p>Выгрузите файл <code>galaxydb.sql</code> и выполните все незакомментированные запросы.</p>
        <img src="https://github.com/user-attachments/assets/c7b1123c-8414-4c2d-bb1d-c522f7ced7d6" alt="sql import" />

        <div class="step">🐍 Шаг 3: Настройка бэкенда (Flask)</div>
        <p>Откройте <code>galaxy/rest-api/config.py</code> и в параметре <code>host</code> укажите IP-адрес вашего сервера с БД.</p>
        <img src="https://github.com/user-attachments/assets/ceddada5-8cb7-4c14-876d-64b2ef425c9b" alt="config" />
        <p>Установите зависимости и запустите API:</p>
        <pre><code>pip install flask flask-jwt-extended flask-cors
python main.py</code></pre>
        <img src="https://github.com/user-attachments/assets/81b43710-a026-431c-938b-4abeab542bd7" alt="flask run" />

        <div class="step">⚛️ Шаг 4: Настройка фронтенда (React)</div>
        <p>Скопируйте IP-адрес сервера API (виден в терминале) и вставьте во все строки, где используются <code>react-query</code> или <code>await fetch</code>.</p>
        <img src="https://github.com/user-attachments/assets/d76f2c35-091c-47dc-808e-9d0aab3b855d" alt="api ip" />
        <p>Установите зависимости и запустите React:</p>
        <pre><code>npm install
npm run dev</code></pre>
        <img src="https://github.com/user-attachments/assets/86e0ebc3-ff82-4e02-a54c-2364b0f84d52" alt="npm run" />
        <blockquote>✅ <strong>Готово!</strong> Проект успешно запущен. Переходите по адресу <code>http://localhost:3000</code>.</blockquote>
        <img src="https://github.com/user-attachments/assets/c03acc0c-3ee9-40a9-a857-5001507dd79b" alt="final" />

        <hr />

        <h2>📖 Руководство пользователя</h2>

        <h3>🔐 Регистрация и авторизация</h3>
        <p>После запуска проекта необходимо создать аккаунт.</p>
        <img src="https://github.com/user-attachments/assets/c3f74810-7ff0-459e-a3cb-c1b931dcda3d" alt="register" />
        <p>Затем приложение перенаправит на страницу авторизации — введите указанные ранее данные.</p>
        <img src="https://github.com/user-attachments/assets/1a2bf621-a0bf-449b-bec8-9374d96dd4b8" alt="login" />

        <h3>🏠 Главная страница</h3>
        <p>После входа открывается главная лента. В левом сайдбаре находятся кнопки «Написать», «Подписки», «Выйти», а также навигация по темам (топикам). В шапке — переключение тем, поиск и кнопка профиля.</p>
        <img src="https://github.com/user-attachments/assets/e7af3117-0401-46ee-8493-eea62ab04913" alt="dark theme" />
        <div class="img-caption">🌙 Тёмная тема (по умолчанию)</div>
        <img src="https://github.com/user-attachments/assets/45546a5b-8240-45fb-b6b0-ed9e0812a352" alt="light theme" />
        <div class="img-caption">☀️ Светлая тема</div>

        <h3>✍️ Создание поста</h3>
        <p>Нажмите «Написать» в сайдбаре, введите заголовок и текст, выберите тему и при желании прикрепите файл (изображение, видео или аудио).</p>
        <img src="https://github.com/user-attachments/assets/3d497d93-9900-4a7b-91e0-f98c219ccf64" alt="new post" />
        <p>После успешного создания появится уведомление, а пост отобразится в ленте.</p>
        <img src="https://github.com/user-attachments/assets/d342e787-6c74-47c0-9d27-958e85ce185c" alt="post created" />

        <h3>💬 Взаимодействие</h3>
        <p>Посты можно лайкать и комментировать.</p>
        <img src="https://github.com/user-attachments/assets/c66d944d-c49b-4a7b-b337-58524f51aa29" alt="likes and comments" />

        <h3>👤 Профиль</h3>
        <p>Чтобы перейти в свой профиль, нажмите на кнопку профиля в шапке. Для просмотра чужого профиля — кликните на никнейм пользователя.</p>
        <img src="https://github.com/user-attachments/assets/89e6c332-4437-4f34-a27f-9e6e76e3dbad" alt="profile" />
        <p>Информацию можно редактировать, нажав на карандаш ✏️ (изменение никнейма, аватарки и описания).</p>
        <img src="https://github.com/user-attachments/assets/01c51d9e-d7bf-4238-84a5-b2521d0e7d8b" alt="edit profile 1" />
        <img src="https://github.com/user-attachments/assets/c4ca7912-58a7-486b-9829-213006148d40" alt="edit profile 2" />

        <hr />

        <h2>🎯 Для чего этот проект?</h2>
        <p>
            Galaxy — мой дипломный проект. Он стал первым полноценным прототипом социальной сети, на котором я:
            <ul>
                <li>🔌 осваивал написание <strong>REST API</strong> на Flask</li>
                <li>🧩 строил клиентскую часть на <strong>React</strong> (компоненты, стейт-менеджмент, react-query)</li>
                <li>🔐 внедрял JWT-аутентификацию</li>
                <li>🗄️ проектировал базу данных (MySQL) и связывал её с бэкендом</li>
                <li>🌙 реализовал смену светлой/тёмной темы</li>
            </ul>
            Этот проект помог мне углубить понимание клиент-серверной архитектуры и современных инструментов веб-разработки.
        </p>

        <hr />

        <h2>📬 Контакты</h2>
        <p>Если есть вопросы или предложения — всегда рад обратной связи:</p>
        <ul>
            <li>📧 Email: <a href="mailto:maxytko108@gmail.com">maxytko108@gmail.com</a></li>
            <li>💬 Telegram: <a href="https://t.me/garageenjoyer">@garageenjoyer</a></li>
            <li>🐙 GitHub: <a href="https://github.com/gaspacho2103">gaspacho2103</a></li>
        </ul>
        <blockquote>⭐️ Если проект вам понравился, поставьте звёздочку на GitHub — это очень поддерживает!</blockquote>
    </div>
    <footer>
        🌌 Galaxy — социальная сеть, созданная с ❤️ для форматного общения и обучения.
    </footer>
</div>
</body>
</html>
