<h1>Добро пожаловать в Galaxy! 🌐</h1>
<br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9edae280-cebb-4bad-983d-112a32d11e87" />
<br />
<h3>Что это такое? 🧐</h3>
<br />
<p>
Galaxy - это импровизированная социальная сеть форумного типа, написанная на React Js + Python Flask, использующая архитектуру REST API.
В Galaxy можно писать посты (с прикрепленными файлами или без), ставить лайки и оценивать посты других пользователей комментариями, а так же подпиской на других пользователей.
Помимо этого в профиле можно посмотреть статистику подписчиков и постов, увидеть список своих подписок, редактировать свой профиль (поменять аватар, никнейм или описание) или написать новый пост.
</p>
<br />
<hr>
<br />
<h3>Технологии 👨‍💻</h3>
<ul>
  <li>React JS</li>
  <li>react-query</li>
  <li>Python Flask</li>
  <li>REST API</li>
  <li>Flask JWT</li>
  <li>MySQL</li>
</ul>
<br />
<hr>
<br />
<h3>Установка</h3>
<br />
<p>В этом блоке описана установка на локальный сервер</p>
<br /><br />
<span>Шаг 1: Скачайте архив с репозитория или откройте Git Bash и пропишите git clone {url репозитория}</span>
<br /><br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b276a76f-e17d-4f91-8495-dde9714ba4b2" /><br />
<img width="581" height="371" alt="image" src="https://github.com/user-attachments/assets/3ad9fb17-fb7f-4eb0-84d2-8d129ab94fbd" />
<br />
<br />
<span>Шаг 2: Откройте MySQL WorkBench (или другую СУБД) и создайте подключение</span>
<br /><br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6a31d269-e149-4ec8-b280-fbf06f39bf9c" />
<br /><br />
<span>Шаг 3: Выгрузите файл galaxydb.sql и выполните все незакомментированные запросы</span>
<br /><br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c7b1123c-8414-4c2d-bb1d-c522f7ced7d6" />
<br /><br />
<span>Шаг 4: Откройте galaxy/rest-api/config.py и пропишите в параметр host IP-адрес своего сервера с базой данных</span>
<br /><br />
<img width="798" height="492" alt="image" src="https://github.com/user-attachments/assets/ceddada5-8cb7-4c14-876d-64b2ef425c9b" />
<br /><br />
<span>Шаг 5: Пропишите в терминале python main.py (запустите API)</span><br /><br />
<strong>ВНИМАНИЕ! Убедитесь что у вас установлены Python 3.13+ и фреймворк Flask. Установите их в случае их отсутствия</strong>
<br /><br />
<img width="797" height="213" alt="image" src="https://github.com/user-attachments/assets/81b43710-a026-431c-938b-4abeab542bd7" />
<br /><br />
<span>Шаг 6: Скопируйте IP-адрес сервера с API (он будет виден в терминале) и вставьте во все строки, где используется react-query или await fetch</span>
<br /><br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d76f2c35-091c-47dc-808e-9d0aab3b855d" />
<br /><br />
<span>Шаг 7: Откройте терминал в React проекте и напишите npm install для установки зависимостей, после чего напишите npm run dev и перейдите на localhost</span>
<br /><br />
<img width="1335" height="239" alt="image" src="https://github.com/user-attachments/assets/86e0ebc3-ff82-4e02-a54c-2364b0f84d52" />
<br /><br />
<strong>Готово! Проект запущен</strong>
<br /><br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c03acc0c-3ee9-40a9-a857-5001507dd79b" />
<br /><br />
<hr>
<br />
<h3>Руководство пользователя 👨‍💻</h3>
<br /><br />
<span>Здесь кратко описаны возможности. После успешного запуска проекта необходимо создать аккаунт</span>
<br /><br />
<img width="1920" height="955" alt="image" src="https://github.com/user-attachments/assets/c3f74810-7ff0-459e-a3cb-c1b931dcda3d" />
<br /><br />
<span>Затем приложение нас перекинет на страницу авторизации, где необходимо ввести указанные ранее данные для входа в аккаунт</span>
<br /><br />
<img width="1920" height="955" alt="image" src="https://github.com/user-attachments/assets/1a2bf621-a0bf-449b-bec8-9374d96dd4b8" />
<br /><br />
<p>После авторизации происходит редирект на главную страницу (home). На странице виден блок с постами(их пока нет), шапка с лого, поиском, кнопкой профиля и кнопкой смены темы.
В левой части страницы виден боковой сайдбар. В нем присуствуют кнопки: "Написать" для написания постов, "Подписки для вывода списка подписок пользователя, "Выйти" для выхода из аккаунта.
Чуть ниже в сайдбаре расположена навигация по темам (топикам).
</p>
<br /><br />
<img width="1920" height="956" alt="image" src="https://github.com/user-attachments/assets/e7af3117-0401-46ee-8493-eea62ab04913" />
<br />Тёмная тема (по умолчанию)
<img width="1920" height="954" alt="image" src="https://github.com/user-attachments/assets/45546a5b-8240-45fb-b6b0-ed9e0812a352" />
<br />Светлая тема
<br /><br />
<span>Для написания поста нужно нажать кнопку "Написать" на боковом сайдбаре, ввести заголовок и текст поста во всплывающем окне, выбрать тему и по желанию прикрепить картинку, видео или аудиофайл</span>
<br /><br />
<img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/3d497d93-9900-4a7b-91e0-f98c219ccf64" />
<br /><br />
<span>В правом нижнем углу появляется сообщение об успешном создании публикации и на домашней странице появляется первый пост</span>
<br /><br />
<img width="1920" height="954" alt="image" src="https://github.com/user-attachments/assets/d342e787-6c74-47c0-9d27-958e85ce185c" />
<br /><br />
<span>Посты так же можно лайкать и комментировать</span>
<br /><br />
<img width="1920" height="955" alt="image" src="https://github.com/user-attachments/assets/c66d944d-c49b-4a7b-b337-58524f51aa29" />
<br /><br />
<span>Для посещения своего профиля необходимо нажать на кнопку профиля в шапке, для перехода на профиль другого пользователя достаточно кликнуть на его никнейм</span>
<br /><br />
<span>В профиле выводится базовая статистика пользователя (количество подписчиков, подписки, количество постов, дата регистрации), выводится его никнейм и аватар, краткое описание, а так же посты, написанные пользователем</span>
<br /><br />
<img width="1920" height="954" alt="image" src="https://github.com/user-attachments/assets/89e6c332-4437-4f34-a27f-9e6e76e3dbad" />
<br /><br />
<span>Информация в профиле поддается редактированию. При нажатии на карандаш появляется возможность поменять никнейм, аватарку и описание</span>
<br /><br />
<img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/01c51d9e-d7bf-4238-84a5-b2521d0e7d8b" />
<br /><br />
<img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/c4ca7912-58a7-486b-9829-213006148d40" />
<br />
<hr>
<br />
<h3>Для чего этот проект? 🧐</h3>
<br />
<p>Это мой дипломный проект и по совместительсту первый прототип социальной сети (форума) на котором я обучался писать API на Flask и Frontend на React JS, более углубленно использовать REST архитектуру,
токены авторизации и другие инструменты разработки.</p>
