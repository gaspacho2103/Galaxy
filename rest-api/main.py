# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request, Response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from config import get_connection
import os
from datetime import timedelta

from User.User import User
from Post.Post import Post

app = Flask(__name__, static_folder='files')

CORS(app)

app.config['JWT_SECRET_KEY'] = 'fcukelWmvmtgFYKerjgLrhLnKJloTLjE'
ACCESS_TOKEN_EXPIRE_MINUTES = 120

jwt = JWTManager(app)


@app.route('/users', methods=['GET'])
def get_users():
    users = User.select_users()
    return jsonify(users), 200

@app.route('/register', methods=['POST'])
def reg_user():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Все поля обязательны для заполнения!'}), 400

    user = User.reg_user(username, email, password)

    return jsonify(user), 201

@app.route('/authorize', methods=['POST'])
def auth_user():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({'error': 'Все поля обязательны для заполнения!'}), 400
    
    user = User.auth_user(username_or_email, password)

    return jsonify(user), 200

@app.route('/posts', methods=['POST'])
@jwt_required()
def add_post():
    title = request.form.get('title')
    topic = request.form.get('topic')
    file = request.files.get('file')
    content = request.form.get('content')

    user_id = get_jwt_identity()

    
    if not file:
        filename = None
        file_format = None
        file_data = None
    else:
        filename = file.filename
        file_format = filename.split('.')[-1] if filename else None

        if not filename or not file_format:
            return {'error': 'Некорректное имя файла'}, 400

        file_data = file.read()

    post = Post.add_new_post(user_id, title, topic, content, filename, file_format, file_data)

    return jsonify(post), 201

@app.route('/like/<int:post_id>', methods=['POST'])
@jwt_required()
def like_post(post_id):
    user_id = get_jwt_identity()

    post = Post.add_like_post(user_id, post_id)

    return jsonify(post), 201

@app.route('/comment/<int:post_id>', methods=['POST'])
@jwt_required()
def add_post_comment(post_id):
    user_id = get_jwt_identity()

    data = request.get_json()

    content = data.get('content')

    post = Post.add_post_comment(user_id, post_id, content)

    return jsonify(post), 201

@app.route('/users/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    post = Post.delete_post(post_id)
    return jsonify(post), 204

@app.route('/like/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_like_post(post_id):
    user_id = get_jwt_identity()

    post = Post.delete_like_post(user_id, post_id)

    return jsonify(post), 204

@app.route('/comment/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post_comment(post_id):
    user_id = get_jwt_identity()

    post = Post.delete_post_comment(user_id, post_id)

    return jsonify(post), 204



@app.route('/users/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.select_user(user_id)
    return jsonify(user), 200

@app.route('/users/posts/me', methods=['GET'])
@jwt_required()
def get_my_posts():
    user_id = get_jwt_identity()
    posts = Post.select_user_posts(user_id)
    return jsonify(posts), 200

@app.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.select_user(user_id)
    return jsonify(user), 200

@app.route('/users/posts/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_posts(user_id):
    posts = Post.select_user_posts(user_id)
    return jsonify(posts), 200

@app.route('/posts', methods=['GET'])
@jwt_required()
def get_all_posts():
    posts = Post.select_all_posts()
    return jsonify(posts), 200

@app.route('/posts/topic/<string:topic>', methods=['GET'])
@jwt_required()
def get_topic_posts(topic):
    posts = Post.select_topic_posts(topic)
    return jsonify(posts), 200

@app.route('/users/subscribe/<int:followed_id>', methods=['POST'])
@jwt_required()
def add_user_subscribe(followed_id):
    user_id = get_jwt_identity()
    user = User.add_user_sub(user_id, followed_id)
    return jsonify(user), 200

@app.route('/users/subscribe/<int:followed_id>', methods=['DELETE'])
@jwt_required()
def del_user_subscribe(followed_id):
    user_id = get_jwt_identity()
    user = User.del_user_sub(user_id, followed_id)
    return jsonify(user), 200

@app.route('/users/me', methods=['PATCH'])
@jwt_required()
def edit_user():
    user_id = get_jwt_identity()
    username = request.form.get('username')
    description = request.form.get('description')
    avatar_file = request.files.get('avatar')

    avatar_data = None
    if avatar_file and avatar_file.filename:
        avatar_data = avatar_file.read()

    user = User.edit_user_profile(user_id, username, description, avatar_data)
    return jsonify(user), 200

@app.route('/users/<int:user_id>/avatar')
def get_user_avatar(user_id):
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT avatar FROM users WHERE user_id = %s', (user_id,))
    avatar = cursor.fetchone()
    cursor.close()
    connection.close()
    
    if not avatar or not avatar[0]:
        return '', 404
    
    return Response(avatar[0], mimetype='image/jpeg')


if __name__ == '__main__':
    app.run(debug=True)
