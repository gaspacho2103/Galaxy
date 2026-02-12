
from config import get_connection
import os
import base64


class Post:
    @staticmethod
    def select_user_posts(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM `posts` WHERE user_id = %s', (user_id,))
        posts = cursor.fetchall()

        cursor.close()
        connection.close()

        post_list = []

        for post in posts:
            file_list = Post.select_post_pin_files(post[0])
            likes_count = Post.select_post_likes_count(post[0])
            comments_count = Post.select_post_comments_count(post[0])
            comment_list = Post.select_post_comments(post[0])
            username = Post.select_post_username(post[1])
            
            post_list.append({
                'post_id': post[0],
                'user_id': post[1],
                'username': username,
                'title': post[2],
                'topic': post[3],
                'content': post[4],
                'pin_files': file_list,
                'created_at': post[5],
                'likes_count': likes_count,
                'comments_count': comments_count,
                'comment_list': comment_list,
                'avatar_url': f'/users/{user_id}/avatar'
            })

        return post_list
    
    @staticmethod
    def select_all_posts():
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM `posts`')
        posts = cursor.fetchall()

        cursor.close()
        connection.close()

        post_list = []

        for post in posts:
            file_list = Post.select_post_pin_files(post[0])
            likes_count = Post.select_post_likes_count(post[0])
            comments_count = Post.select_post_comments_count(post[0])
            comment_list = Post.select_post_comments(post[0])
            username = Post.select_post_username(post[1])
            
            post_list.append({
                'post_id': post[0],
                'user_id': post[1],
                'username': username,
                'title': post[2],
                'topic': post[3],
                'content': post[4],
                'pin_files': file_list,
                'created_at': post[5],
                'likes_count': likes_count,
                'comments_count': comments_count,
                'comment_list': comment_list,
                'avatar_url': f'/users/{post[1]}/avatar'
            })

        return post_list
    
    @staticmethod
    def select_topic_posts(topic):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM `posts` WHERE topic = %s', (topic,))
        posts = cursor.fetchall()

        cursor.close()
        connection.close()

        post_list = []

        for post in posts:
            file_list = Post.select_post_pin_files(post[0])
            likes_count = Post.select_post_likes_count(post[0])
            comments_count = Post.select_post_comments_count(post[0])
            comment_list = Post.select_post_comments(post[0])
            username = Post.select_post_username(post[1])
            
            post_list.append({
                'post_id': post[0],
                'user_id': post[1],
                'username': username,
                'title': post[2],
                'topic': post[3],
                'content': post[4],
                'pin_files': file_list,
                'created_at': post[5],
                'likes_count': likes_count,
                'comments_count': comments_count,
                'comment_list': comment_list,
                'avatar_url': f'/users/{post[1]}/avatar'
            })

        return post_list

    @staticmethod
    def select_post_pin_files(post_id):
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        
        try:
            cursor.execute('''
                SELECT file_id, post_id, filename, file_format as format, file_data 
                FROM pin_files 
                WHERE post_id = %s AND file_data IS NOT NULL
            ''', (post_id,))
            
            files = []
            for file in cursor.fetchall():
                try:
                    files.append({
                        'file_id': file['file_id'],
                        'post_id': file['post_id'],
                        'filename': file['filename'],
                        'format': file['format'].lower(),
                        'content_base64': base64.b64encode(file['file_data']).decode('utf-8')
                    })
                except Exception as e:
                    print(f"Error processing file {file['file_id']}: {str(e)}")
                    continue
                    
            return files
        finally:
            cursor.close()
            connection.close()


    @staticmethod
    def select_post_likes_count(post_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT COUNT(*) as likes_count FROM `likes` WHERE post_id = %s', (post_id,))
        likes_count = cursor.fetchone()

        cursor.close()
        connection.close()

        return likes_count[0] if likes_count else 0
    
    @staticmethod
    def select_post_comments_count(post_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT COUNT(*) as comments_count FROM `comments` WHERE post_id = %s', (post_id,))
        comments_count = cursor.fetchone()

        cursor.close()
        connection.close()

        return comments_count[0] if comments_count else 0
    
    @staticmethod
    def select_post_comments(post_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT * FROM `comments` WHERE post_id = %s', (post_id,))
        comments = cursor.fetchall()

        comment_list = []

        for comment in comments:
            comment_username = Post.select_post_comment_username(comment[2])

            comment_list.append({
                'comment_id': comment[0],
                'post_id': comment[1],
                'user_id': comment[2],
                'username': comment_username,
                'content': comment[3],
                'created_at': comment[4],
                'avatar_url': f'/users/{comment[2]}/avatar'
            })
        
        cursor.close()
        connection.close()

        return comment_list
    
    @staticmethod
    def select_post_username(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT username FROM `users` WHERE user_id = %s', (user_id,))
        username = cursor.fetchone()

        cursor.close()
        connection.close()

        return username[0]
    
    @staticmethod
    def select_post_comment_username(user_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT username FROM `users` WHERE user_id = %s', (user_id,))
        username = cursor.fetchone()

        cursor.close()
        connection.close()

        return username[0]
    
    @staticmethod
    def add_new_post(user_id, title, topic, content, filename, file_format, file_data):
        connection = get_connection()
        cursor = connection.cursor()

        sql = """
            INSERT INTO posts (user_id, title, topic, content)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (user_id, title, topic, content))
        post_id = cursor.lastrowid

        sql_file = """
            INSERT INTO pin_files (post_id, filename, file_format, file_data)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql_file, (post_id, filename, file_format, file_data))
        
        connection.commit()
        cursor.close()
        connection.close()

        return {
            'post_id': post_id,
            'title': title,
            'topic': topic,
            'content': content,
            'filename': filename,
            'file_format': file_format
        }


    @staticmethod
    def delete_post(post_id):
        Post.delete_post_files(post_id)

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('DELETE FROM `posts` WHERE post_id = %s', (post_id,))
        connection.commit()

        cursor.close()
        connection.close()

        return {'message': 'Пост был успешно удален'}
    
    @staticmethod
    def delete_post_files(post_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT filename, f_format FROM `pin_files` WHERE post_id = %s', (post_id,))
        files = cursor.fetchall()

        base_path = '/files/'

        for filename, file_format in files:
            if file_format in ['jpg', 'jpeg', 'png', 'gif']:
                file_path = os.path.join(base_path, 'images', filename)
            elif file_format in ['pdf', 'doc', 'docx']:
                file_path = os.path.join(base_path, 'documents', filename)
            elif file_format in ['mp4', 'avi', 'mkv']:
                file_path = os.path.join(base_path, 'videos', filename)
            else:
                file_path = os.path.join(base_path, 'others', filename)

            if os.path.exists(file_path):
                os.remove(file_path)
                print(f"Удален файл: {file_path}")
            else:
                print(f"Файл не найден: {file_path}")

        cursor.close()
        connection.close()
    
    @staticmethod
    def add_like_post(user_id, post_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('INSERT INTO `likes` (post_id, user_id) VALUES (%s, %s)', (post_id, user_id,))
        connection.commit()

        cursor.close()
        connection.close()

        return {'message': 'Лайк успешно поставлен'}
    
    @staticmethod
    def delete_like_post(user_id, post_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('DELETE FROM `likes` WHERE post_id = %s AND user_id = %s', (post_id, user_id,))
        connection.commit()

        cursor.close()
        connection.close()

        return {'message': 'Лайк снят с поста'}
    
    @staticmethod
    def add_post_comment(user_id, post_id, content):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('INSERT INTO `comments` (post_id, user_id, content) VALUES (%s, %s, %s)', (post_id, user_id, content))
        connection.commit()

        cursor.close()
        connection.close()

        return {'message': 'Комментарий оставлен'}
    
    @staticmethod
    def delete_post_comment(user_id, post_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('DELETE FROM `comments` WHERE post_id = %s AND user_id = %s', (post_id, user_id,))
        connection.commit()

        cursor.close()
        connection.close()

        return {'message': 'Комментарий удален'}

        
    
    