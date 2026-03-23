<h1>Добро пожаловать в Swagger! 🌐</h1>
<br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9edae280-cebb-4bad-983d-112a32d11e87" />
<br />
<h3>Что это такое? 🧐</h3>
<br />
<p>
Swagger - это импровизированная социальная сеть форумного типа, написанная на React Js + Python Flask, использующая архитектуру REST API.
В Swagger можно писать посты (с прикрепленными файлами или без), ставить лайки и оценивать посты других пользователей комментариями, а так же подпиской на других пользователей.
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
<br /><br />
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
<span>Шаг 3: Выгрузите файл swaggerdb.sql и выполните все незакомментированные запросы</span>
<br /><br />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c7b1123c-8414-4c2d-bb1d-c522f7ced7d6" />
<br /><br />
<span>Шаг 4: Откройте swagger/rest-api/config.py и пропишите в параметр host IP-адрес своего сервера с базой данных</span>
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




