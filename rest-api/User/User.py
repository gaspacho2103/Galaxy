
from config import get_connection
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta
import base64

ACCESS_TOKEN_EXPIRE_MINUTES = 120

class User:
    @staticmethod
    def select_user(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM `users` WHERE user_id = %s', (user_id,))
        user = cursor.fetchone()

        cursor.close()
        connection.close()

        if not user:
            return None

        post_count = User.select_user_post_count(user_id)
        followers_count = User.select_user_followers_count(user_id)
        follows_list = User.select_user_follows(user_id)
        likes_list = User.select_user_likes(user_id)

        user_info = {
            'user_id': user[0],
            'username': user[1],
            'email': user[2],
            'created_at': user[4].strftime('%Y-%m-%d'),
            'avatar_url': f'/users/{user[0]}/avatar' if user[5] else None,
            'description': user[6],
            'post_count': post_count,
            'followers_count': followers_count,
            'follows_list': follows_list,
            'likes_list': likes_list
        }

        return user_info
    

    @staticmethod
    def select_user_post_count(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT COUNT(*) as post_count FROM `posts` WHERE user_id = %s', (user_id,))
        post_count = cursor.fetchone()

        cursor.close()
        connection.close()

        return post_count[0] if post_count else 0


    @staticmethod
    def select_users():
        connection = get_connection()
        if connection is None:
            return []

        cursor = connection.cursor()
        cursor.execute('SELECT * FROM `users`')
        users = cursor.fetchall()

        cursor.close()
        connection.close()

        user_list = []
        for user in users:
            user_list.append({
                'user_id': user[0],
                'username': user[1],
                'email': user[2],
                'password_hash': user[3],
                'created_at': user[4],
                'avatar': user[5]
            })

        return user_list
    
    @staticmethod
    def select_user_avatar(user_id):
        conneciton = get_connection()
        cursor = conneciton.cursor()
        cursor.execute('SELECT avatar FROM `users` WHERE user_id = %s', (user_id,))
        user = cursor.fetchone()

        cursor.close()
        conneciton.close()

        return user[0]
    
    @staticmethod
    def select_user_followers_count(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT COUNT(*) as followed_count FROM `subscriptions` WHERE `followed_id` = %s', (user_id,))
        followers_count = cursor.fetchone()

        cursor.close()
        connection.close()

        return followers_count[0] if followers_count else 0
    
    @staticmethod
    def select_user_follows(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM `subscriptions` WHERE `follower_id` = %s', (user_id,))
        follows = cursor.fetchall()

        cursor.close()
        connection.close()

        avatar_url = User.select_user_avatar(user_id)

        follows_list = []
        for follow in follows:
            followed_nickname = User.select_user_followed_nickname(follow[2])

            follows_list.append({
                'followed_id': follow[2],
                'followed_nickname': followed_nickname,
                'avatar_url': f'/users/{user_id}/avatar' if avatar_url else None,
            })

        return follows_list
    
    @staticmethod
    def select_user_followed_nickname(followed_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT username FROM `users` WHERE user_id = %s', (followed_id,))
        followed = cursor.fetchone()

        cursor.close()
        connection.close()

        return followed[0]
    
    @staticmethod
    def select_user_likes(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT post_id FROM `likes` WHERE user_id = %s', (user_id,))
        likes = cursor.fetchall()

        likes_list = []

        for like in likes:

            likes_list.append({
                'post_id': like[0]
            })

        return likes_list
    
    @staticmethod
    def reg_user(username, email, password):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM `users` WHERE username = %s OR email = %s', (username, email))
        if cursor.fetchone() is not None:
            return {'error': 'Пользователь с таким именем или email уже существует!'}

        hashed_password = generate_password_hash(password)

        try:
            cursor.execute('INSERT INTO `users` (username, email, password_hash) VALUES(%s, %s, %s)', (username, email, hashed_password))
            connection.commit()
        except Exception as e:
            return {'error': str(e)}
        finally:
            cursor.close()
            connection.close()

        return {'message': 'Пользователь успешно зарегестрирован!'}

    @staticmethod
    def auth_user(username_or_email, password):
        connection = get_connection()
        cursor = connection.cursor()

        try:
            cursor.execute('SELECT * FROM `users` WHERE username = %s OR email = %s', (username_or_email, username_or_email))
            user = cursor.fetchone()

            if user is None:
                return {'error': 'Неверное имя пользователя или пароль!'}

            if not check_password_hash(user[3], password):  
                return {'error': 'Неверное имя пользователя или пароль!'}

            token = create_access_token(identity=str(user[0]), expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

            return {'message': 'Авторизация успешна!', 'token': token}

        except Exception as e:
            return {'error': str(e)}
        finally:
            cursor.close()
            connection.close()

    @staticmethod
    def add_user_sub(user_id, followed_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('INSERT INTO `subscriptions` (follower_id, followed_id) VALUES(%s, %s)', (user_id, followed_id))
        connection.commit()
        cursor.close()
        connection.close()

        return {'message': 'Подписка успешно оформлена!'}

    @staticmethod
    def del_user_sub(user_id, followed_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('DELETE FROM `subscriptions` WHERE follower_id = %s AND followed_id = %s', (user_id, followed_id,))
        connection.commit()
        cursor.close()
        connection.close()

        return {'message': 'Подписка удалена!'}
    
    @staticmethod
    def edit_user_profile(user_id, username, description, avatar):
        connection = get_connection()
        cursor = connection.cursor()

        query = "UPDATE `users` SET username = %s, description = %s"
        params = [username, description]
        
        if avatar is not None:
            query += ", avatar = %s"
            params.append(avatar)
        
        query += " WHERE user_id = %s"
        params.append(user_id)
        
        cursor.execute(query, tuple(params))
        connection.commit()
        cursor.close()
        connection.close()

        return {'message': 'Профиль успешно отредактирован'}
